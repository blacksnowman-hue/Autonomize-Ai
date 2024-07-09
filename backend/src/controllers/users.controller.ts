import { FilterQuery } from "mongoose";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import User from "../models/users.model";

import { fetchFollowers, fetchFollowing, fetchGitHubUser } from "../utils/GitHubApi";


const getUserAndSave = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User']

  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Invalid Username");
  }

  let user = await User.findOne({ username });

  if (!user) {
    const userData = await fetchGitHubUser(username);

    user = new User({
      username: userData.login,
      location: userData.location,
      blog: userData.blog,
      bio: userData.bio,
      public_repos: userData.public_repos,
      public_gists: userData.public_gists,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    });

    await user.save();
  }
  return res.status(200).json(new ApiResponse(200, user, "User data fetched successfully"));
});

const findMutualFollowers = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User']

  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Invalid Username");
  }

  const userData = await fetchGitHubUser(username);
  const [followers, following] = await Promise.all([fetchFollowers(username), fetchFollowing(username)]);

  const mutualFollowers = followers.filter(follower => following.includes(follower));

  await User.findOneAndUpdate(
    { username: userData.login },
    { $set: { friends: mutualFollowers } },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, { username, mutualFollowers }, "Mutual followers found"));
});

const updateUser = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User']

  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Invalid Username");
  }

  const updatedUser = await User.findOneAndUpdate(
    { username },
    req.body,
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User']

  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Invalid Username");
  }

  const deletedUser = await User.findOneAndDelete({ username });

  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, deletedUser, "User soft deleted successfully"));
});

const searchUsers = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User - filter']

  const { username, location } = req.query;


  let query: FilterQuery<typeof User> = {};

  if (username) {
    query = { ...query, username: { $regex: username, $options: 'i' } };
  }

  if (location) {
    query = { ...query, location: { $regex: location, $options: 'i' } };
  }

  const users = await User.find(query);

  return res.status(200).json(new ApiResponse(200, users, "Found the User"));
});

const sortUsers = asyncHandler(async (req, res) => {
  //#swagger.tags = ['User - filter']

  const { sortBy } = req.query;

  let sortOptions = {};

  switch (sortBy) {
    case "public_repos":
      sortOptions = { public_repos: -1 };
      break;
    case "public_gists":
      sortOptions = { public_gists: -1 };
      break;
    case "followers":
      sortOptions = { followers: -1 };
      break;
    case "following":
      sortOptions = { following: -1 };
      break;
    case "created_at":
      sortOptions = { createdAt: -1 };
      break;
    default:
      sortOptions = { createdAt: 1 };
      break;
  }


  const users = await User.find().sort(sortOptions);

  return res.status(200).json(new ApiResponse(200, users, "Users sorted successfully."));
});




export {
  getUserAndSave,
  findMutualFollowers,
  updateUser,
  deleteUser,
  searchUsers,
  sortUsers
}