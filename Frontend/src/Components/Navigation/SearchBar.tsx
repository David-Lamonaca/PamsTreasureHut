import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../../CSS/Navigation/SearchBar.css';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="search-bar" >
            <input
                className="search-input"
                placeholder="Search for Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
                
                className="search-button"
                aria-label="search"
                onClick={handleSearch}
            >
                <SearchIcon />
            </div>
        </div>
    );
};

export default SearchBar;
