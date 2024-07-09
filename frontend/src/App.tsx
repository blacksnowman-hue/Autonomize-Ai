import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage.tsx';

import HomePage from './pages/HomePage.tsx';
import RepositoryListPage from './pages/RepositoryListPage.tsx';
import RepositoryDetailsPage from './pages/RepositoryDetailsPage.tsx';
import FollowersPage from './pages/FollowersPage.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/repo/:username" element={<RepositoryListPage />} />
      <Route path="/repo/:username/:repoName" element={<RepositoryDetailsPage />} />
      <Route path="/followers/:username" element={<FollowersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;