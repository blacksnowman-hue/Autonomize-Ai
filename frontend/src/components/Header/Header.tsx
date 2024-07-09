import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Autonomize Ai</Link>
    </header>
  );
}

export default Header;
