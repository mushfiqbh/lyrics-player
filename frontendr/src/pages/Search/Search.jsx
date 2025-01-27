import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import Catalog from "../../components/Catalog/Catalog";
import Showcase from "../../components/Showcase/Showcase";
import { StoreContext } from "../../context/StoreContext";

const Search = () => {
  const { setPageTitle } = useContext(StoreContext);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setPageTitle("Search Page - KhubValoMon.Com")
  }, [])

  return (
    <div className="search">
      <Searchbar
        setSearchResult={setSearchResult}
        setSearchPerformed={setSearchPerformed}
      />
      {searchPerformed ? (
        <>
          <h3 className="search_message">
            {searchResult.length} টি ফলাফল পাওয়া গেছে
          </h3>
          <Showcase type="searchList" data={searchResult} />
        </>
      ) : null}
      <Catalog />
    </div>
  );
};

export default Search;
