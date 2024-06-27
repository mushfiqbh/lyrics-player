import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { posts } from "../../assets/assets";
import "./Searchbar.css";

const Searchbar = ({ setSearchResult, setSearchPerformed }) => {
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

    const data = query ? [query] : [];
    setSearchResult(data);
    setSearchPerformed(true);
  };

  // const fetchData = async () => {
  // };

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
