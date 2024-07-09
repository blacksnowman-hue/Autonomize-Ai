import React from 'react';
import { Link } from 'react-router-dom';
import { useGetUserFollowersQuery } from '../../features/followersAPI';
import { Follower } from '../../types/types';

import "./FollowersList.css"

interface FollowersListProps {
  username: string;
}

const FollowersLists: React.FC<FollowersListProps> = ({ username }) => {
  const { data: followers, isLoading, isError } = useGetUserFollowersQuery(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching followers.</div>;

  return (
    <div className="followers-container">
      <h2 className="followers-heading">
        Followers
      </h2>

      <ul className="followers-grid">
        {followers?.map((follower: Follower) => (
          <li key={follower.id} className="follower-card">
            <Link to={`/repo/${follower.login}`} className="follower-link">
              <div className="card-content">
                <img src={follower.avatar_url} alt={`${follower.login}'s avatar`} className="avatar" />
                <div className="follower-info">
                  <span className="follower-name">{follower.login}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default FollowersLists;
