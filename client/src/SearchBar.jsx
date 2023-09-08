import { useState } from "react";
import './css/SearchBar.css'
function SearchBar({onSearch}) {

    const [searchRepo, setSearchRepo] = useState('') ;
    const handleSearchChange = (newSearch) => {
        // console.log(typeof(newSearch.target.value));
        // console.log(newSearch.target.value);
        setSearchRepo(newSearch.target.value)
        onSearch(newSearch.target.value);
    }

    return <div className="search-bar">
        <input
        type="text"
        placeholder="Search..."
        value={searchRepo}
        onChange={handleSearchChange}
      />
    </div>
}
export default SearchBar;