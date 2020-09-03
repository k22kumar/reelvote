import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Navigation from "./components/Navigation";
import SearchResults from "./components/SearchResults";
import firebase from "./components/Firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const App = () => {
  const dbRef = firebase.database().ref();
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
      }
    });
  };

  const closeSearch = () => {
    setIsSearching(false);
    setSearchMessage("");
  };

  const handleSignInAndRegister = () => {
    Swal.fire({
      html: `<input id='username' class="swal2-input" type='email' placeholder="your username ..."> <br/> <input class="swal2-input" id='password' type='password' placeholder="your password ...">`,
      preConfirm: () => ({
        currentPassword: document.getElementById("username").value,
        newPassword1: document.getElementById("password").value,
      }),
    });
  }

  return (
    <div className="App">
      <Navigation handleSearch={handleSearch} closeSearch={closeSearch} handleSignInAndRegister={handleSignInAndRegister}/>
      {isSearching && (
        <SearchResults results={results} searchMessage={searchMessage} />
      )}
    </div>
  );
};

export default App;
