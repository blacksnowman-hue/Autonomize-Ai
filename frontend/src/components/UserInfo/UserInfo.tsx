import React from 'react';

import { Link } from 'react-router-dom';
import { User } from '../../types/types';

import "./UserInfo.css"

interface UserInfoProps {
  user: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className='user-container'>

      <div className="user-info">
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} />
        <h2>{user.login}</h2>
        <p>{user.bio}</p>
        <p>Location: {user.location}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <Link to={`/followers/${user.login}`}>View Followers</Link>
      </div>
    </div>
  );
};

export default UserInfo;