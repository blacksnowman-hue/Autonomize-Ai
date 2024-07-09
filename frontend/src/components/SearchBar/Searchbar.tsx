import React, { ChangeEvent, FormEvent, useState } from 'react';
import "./SearchBar.css"

interface SearchBarProps {
  username: string;
  handleSearch: (username: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({
  username, handleSearch,
}) => {
  const [inputValue, setInputValue] = useState(username);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search GitHub username"
        className="search-input"
      />
      <button type="submit" className="search-button">
        <img src="/search.svg" alt="search" width={20} height={20} />
      </button>
    </form>
  );
};

export default SearchBar;