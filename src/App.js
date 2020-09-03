import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Navigation from "./components/Navigation";
import SearchResults from "./components/SearchResults";
import firebase from "./components/Firebase";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const App = () => {
  const dbRef = firebase.database().ref();
  // state variables
  // search results
  const [results, setResults] = useState([]);
  // check if user is searching
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState("");

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
    swal
      .fire({
        title: `Sign In or Register`,
        showCancelButton: true,
        confirmButtonText: `Sign In`,
        cancelButtonText: `Register`,
      })
      .then((result) => {
        if (result.value) {
          experimentalPrompt("Sign In");
        } else if (result.dismiss === swal.DismissReason.cancel) {
          experimentalPrompt("Register");
        }
      });
  };
  // function name = async (p) => {const prompt = await swal({})}
  const experimentalPrompt = async (signMethod) => {
    const promptArr = [];
    let username = "";
    let password = "";
    const credentials = () => {
      swal
        .fire({
          title: signMethod,
          html: `<input id='username' class="swal2-input" required type='email' placeholder="your username ..." value=${username}> <br/> <input class="swal2-input" required id='password' type='password value=${password}' placeholder="your password ...">`,
          showCancelButton: true,
          confirmButtonText: signMethod,
          preConfirm: () => ({
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value,
          }),
        })
        .then((result) => {
          if (result.value) {
            const { user, pass } = result.value;
            username = user;
            password = password;
            if (user === "" || pass === "") {
              promptArr[1]();
            }
          } else if (result.dismiss === swal.DismissReason.cancel) {
          }
        });
    };
    promptArr.push(credentials);
    const emptyFields = () => {
      swal
        .fire({
          icon: "error",
          title: "Oops...",
          text: "You can't have empty fields!",
          showCancelButton: true,
          cancelButtonText: "Back",
        })
        .then((result) => {
          if (result.dismiss === swal.DismissReason.cancel) {
            promptArr[0]();
          }
        });
    };
    promptArr.push(emptyFields);
    // to call a function just promptArr[desiredCall](params)
    promptArr[0]();
  };

  const credentialsPrompt = (signMethod) => {
    swal
      .fire({
        title: signMethod,
        html: `<input id='username' class="swal2-input" required type='email' placeholder="your username ..."> <br/> <input class="swal2-input" required id='password' type='password' placeholder="your password ...">`,
        showCancelButton: true,
        confirmButtonText: signMethod,
        preConfirm: () => ({
          user: document.getElementById("username").value,
          pass: document.getElementById("password").value,
        }),
      })
      .then((result) => {
        if (result.value) {
          const { user, pass } = result.value;
          if (user === "" || pass === "") {
          }
          swal.fire(`SUP ${user}`, "Your logged in.", "success");
        } else if (result.dismiss === swal.DismissReason.cancel) {
        }
      });
  };

  return (
    <div className="App">
      <Navigation
        handleSearch={handleSearch}
        closeSearch={closeSearch}
        handleSignInAndRegister={handleSignInAndRegister}
      />
      {isSearching && (
        <SearchResults results={results} searchMessage={searchMessage} />
      )}
    </div>
  );
};

export default App;
