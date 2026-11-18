
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
