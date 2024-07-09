import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import { useSearchUser } from '../hooks/useSearchUser';
import NotFoundPage from './NotFoundPage';
import UserInfo from '../components/UserInfo/UserInfo';
import Header from '../components/Header/Header';
import RepoList from '../components/RepoList/RepoList';

const HomePage: React.FC = () => {

  const { user, isError, handleSearch } = useSearchUser();
  const username = user?.login || '';

  console.log(user);

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Header />
      <SearchBar
        username={username}
        handleSearch={handleSearch}
      />


      {user && (
        <>
          <UserInfo user={user} />
          <RepoList username={user.login} />
        </>
      )}
    </div>
  )
}

export default HomePage