import React from 'react';
import Header from '../components/Header/Header';
import RepoDetails from '../components/RepoDetails/RepoDetails.tsx';
import { useParams } from 'react-router-dom';

import { Repo } from '../types/types';
import { useGetUserReposQuery } from '../features/reposAPI';

const RepositoryDetailsPage: React.FC = () => {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const { data: repos, isLoading, isError } = useGetUserReposQuery(username || '', {
    skip: !username,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching repositories.</div>;

  const repo = repos?.find((repo: Repo) => repo.name === repoName);

  return (
    <div>
      <Header />

      <h1>Repository Details</h1>

      {repo && <RepoDetails repo={repo} />}
    </div>
  );
};

export default RepositoryDetailsPage;