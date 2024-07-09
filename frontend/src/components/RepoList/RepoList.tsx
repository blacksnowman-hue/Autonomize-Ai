import React from 'react';

import { Link } from 'react-router-dom';
import { useGetUserReposQuery } from '../../features/reposAPI';
import { Repo } from '../../types/types';

import "./RepoList.css"

interface RepoListProps {
  username: string;
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const { data: repos, isLoading, isError } = useGetUserReposQuery(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching repositories.</div>;

  return (
    <div className="repo-list">
      <h1>Repositories ( {repos?.length} )</h1>
      <ul>
        {repos?.map((repo: Repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${username}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;