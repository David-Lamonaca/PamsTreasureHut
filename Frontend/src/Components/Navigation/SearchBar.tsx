import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../../CSS/Navigation/SearchBar.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="search-bar" role="search">
            <input
                className="search-input"
                placeholder="Search for Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search input"
                tabIndex={0}
            />
            <button
                className="search-button"
                aria-label="Search button"
                onClick={handleSearch}
                tabIndex={0}
            >
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;
