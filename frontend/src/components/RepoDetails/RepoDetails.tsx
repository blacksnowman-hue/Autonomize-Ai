import React from 'react';
import { Repo } from '../../types/types';

import "./RepoDetails.css"

interface RepoDetailsProps {
  repo: Repo;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => {
  return (
    <div className="repo-details">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Language: {repo.language}</p>
    </div>
  );
};

export default RepoDetails;