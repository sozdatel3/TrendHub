// import useDebounce
import { useState, useEffect} from "react";
import { useDebounce } from 'usehooks-ts'
import './css/SearchBar.css'

function SearchBar({onSearch}) {
    const [searchRepo, setSearchRepo] = useState('') ;
    const debouncedValue = useDebounce(searchRepo, 500)
    
    const handleSearchChange = (newSearch) => {
        setSearchRepo(newSearch.target.value)
    }
    useEffect(() => {
        onSearch(searchRepo);
    }, [debouncedValue]
    )
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