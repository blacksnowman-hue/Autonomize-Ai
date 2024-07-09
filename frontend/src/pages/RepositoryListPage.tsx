import React from 'react';
import Header from '../components/Header/Header';
import RepoList from '../components/RepoList/RepoList';
import UserInfo from '../components/UserInfo/UserInfo';
import { useParams } from 'react-router-dom';
import { useSearchUser } from '../hooks/useSearchUser';

const RepositoryListPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user, isLoading, isError } = useSearchUser(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching user data.</div>;

  return (
    <div>
      <Header />

      <h1>Repository List</h1>

      {user && (
        <>
          <UserInfo user={user} />
          <RepoList username={user.login} />
        </>
      )}

    </div>
  );
};

export default RepositoryListPage;