import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Navigation from "./components/Navigation";
import SearchResults from "./components/SearchResults";

const App = () => {
  // state variables
  // search results
  const [results, setResults] = useState([]);
  // check if user is searching
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  // functions
  const handleSearch = (e, query) => {
    setIsSearching(true);
    e.preventDefault();
    axios({
      url: "http://www.omdbapi.com/?i=tt3896198&apikey=5f442a30",
      method: "GET",
      responseType: "json",
      params: {
        s: query,
        plot: "Short",
        type: "movie",
      },
    }).then((response) => {
      if (response.data.Error === "Movie not found!") {
        setSearchMessage(`Sorry, could not find results for: ${query}`);
      } else {
        setSearchMessage(
          `Found ${response.data.Search.length} results for : ${query}`
        );
        setResults(response.data.Search);
        console.log(response.data.Search);
      }
    });
  };

  const closeSearch = () => {
    setIsSearching(false);
    setSearchMessage("");
  };

  return (
    <div className="App">
      <Navigation handleSearch={handleSearch} closeSearch={closeSearch} />
      {isSearching && (
        <SearchResults results={results} searchMessage={searchMessage} />
      )}
    </div>
  );
};

export default App;
