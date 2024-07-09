import React from 'react';

import { useParams } from 'react-router-dom';
import FollowersLists from '../components/FollowersList/FollowersLists';
import Header from '../components/Header/Header';

const FollowersList: React.FC = () => {
  const { username } = useParams<{ username?: string }>();
  return (
    <div>
      <Header />
      {username
        ? <FollowersLists username={username} />
        : <div>No username provided</div>
      }
    </div>
  );
};

export default FollowersList;

