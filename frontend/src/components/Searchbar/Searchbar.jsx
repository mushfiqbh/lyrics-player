import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import "./Searchbar.css";
import { StoreContext } from "../../context/StoreContext";

const Searchbar = ({ setSearchResult, setSearchPerformed }) => {
  const { posts, catalog } = useContext(StoreContext);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = new URLSearchParams(location.search).get("query");
  const [query, setQuery] = useState(initialQuery || "");
  const [searchTime, setSearchTime] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchTime(Date.now().toString());
    navigate(`/search?query=${encodeURIComponent(query)}`);

    const options = {
      keys: ["title", "subtitle", "content", "desc"],
      includeScore: true,
      threshold: 0.3, // Adjust this value to control the fuzziness
    };

    const fuse = new Fuse([...posts, ...catalog], options);

    const result = fuse.search(query);
    const data = result.map(({ item }) => item);
    setSearchResult(data);
    setSearchPerformed(true);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [searchTime]);

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="search"
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="এখানে টাইপ করুন"
      />
      <button type="submit">খুঁজুন</button>
    </form>
  );
};

export default Searchbar;
