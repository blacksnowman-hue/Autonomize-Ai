export const fetchFollowers = async (username: string): Promise<string[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/followers`);
    if (!response.ok) {
      throw new Error(`Failed to fetch followers for ${username}`);
    }
    const followers = await response.json();

    return followers.map((follower: { login: string }) => follower.login);

  } catch (error) {
    console.error("Error fetching followers from GitHub API", error);
    throw error;
  }
};


export const fetchFollowing = async (username: string): Promise<string[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/following`);

    if (!response.ok) {
      throw new Error(`Failed to fetch following for ${username}`);
    }
    const following = await response.json();
    return following.map((following: { login: string }) => following.login);
  } catch (error) {
    console.error("Error fetching following from GitHub API", error);
    throw error;
  }
};




export const fetchGitHubUser = async (username: string): Promise<any> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user ${username}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching from GitHub API", error);
    throw error;
  }
};
