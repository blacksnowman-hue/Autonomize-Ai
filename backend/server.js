// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { sequelize, User, Friend } = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const GITHUB_API_URL = 'https://api.github.com/users';

app.post('/user', async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ where: { username } });
    if (!user) {
      const response = await axios.get(`${GITHUB_API_URL}/${username}`);
      const userData = response.data;
      user = await User.create({
        username: userData.login,
        name: userData.name,
        location: userData.location,
        bio: userData.bio,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/user/friends', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const followers = (await axios.get(`${GITHUB_API_URL}/${username}/followers`)).data;
    const following = (await axios.get(`${GITHUB_API_URL}/${username}/following`)).data;

    const mutualFriends = followers.filter(f => following.some(ff => ff.login === f.login));
    
    for (const friendData of mutualFriends) {
      let friend = await User.findOne({ where: { username: friendData.login } });
      if (!friend) {
        const friendResponse = await axios.get(`${GITHUB_API_URL}/${friendData.login}`);
        const friendUserData = friendResponse.data;
        friend = await User.create({
          username: friendUserData.login,
          name: friendUserData.name,
          location: friendUserData.location,
          bio: friendUserData.bio,
          public_repos: friendUserData.public_repos,
          public_gists: friendUserData.public_gists,
          followers: friendUserData.followers,
          following: friendUserData.following,
          created_at: friendUserData.created_at,
          updated_at: friendUserData.updated_at
        });
      }
      await Friend.findOrCreate({ where: { userId: user.id, friendId: friend.id } });
    }
    res.json(mutualFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ deleted_at: new Date() });
    res.json({ message: 'User soft deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  const { sortBy } = req.query;
  try {
    const users = await User.findAll({
      where: { deleted_at: null },
      order: [[sortBy, 'DESC']]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
