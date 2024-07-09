// db.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  bio: DataTypes.STRING,
  public_repos: DataTypes.INTEGER,
  public_gists: DataTypes.INTEGER,
  followers: DataTypes.INTEGER,
  following: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false });

const Friend = sequelize.define('Friend', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false });

User.belongsToMany(User, { as: 'Friends', through: Friend, foreignKey: 'userId', otherKey: 'friendId' });

sequelize.sync();

module.exports = { sequelize, User, Friend };
