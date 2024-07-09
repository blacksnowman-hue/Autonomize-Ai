import React from 'react';
import Header from '../components/Header/Header';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <h1 className="not-found-message">
          404 - Page Not Found
        </h1>
      </div>
    </>
  );
};

export default NotFoundPage;