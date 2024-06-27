import React, { useEffect, useState } from "react";
import "./Search.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import Catalog from "../../components/Catalog/Catalog";
import Showcase from "../../components/Showcase/Showcase";

const Search = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="search">
      <Searchbar
        setSearchResult={setSearchResult}
        setSearchPerformed={setSearchPerformed}
      />
      {searchPerformed ? (
        <>
          <h3 className="search-message">
            {searchResult.length} টি ফলাফল পাওয়া গেছে
          </h3>
          <Showcase type="list" data={searchResult} />
        </>
      ) : null}
      <Catalog />
    </div>
  );
};

export default Search;
