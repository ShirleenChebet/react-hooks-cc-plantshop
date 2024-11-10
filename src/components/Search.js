import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log("onSearch:", onSearch); // Log to check if it's passed as a function
    if (typeof onSearch === 'function') {
      onSearch(query); // Pass the search query to the parent component
    } else {
      console.error("onSearch is not a function");
    }
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}


export default Search;
