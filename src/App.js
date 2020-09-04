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
          credentialsPrompt("Sign In");
        } else if (result.dismiss === swal.DismissReason.cancel) {
          credentialsPrompt("Register");
        }
      });
  };
  // function name = async (p) => {const prompt = await swal({})}
  const credentialsPrompt = async (signMethod) => {
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
            password = pass;
            if (user === "" || pass === "") {
              promptArr[1]("You can't have empty fields!");
            } else {
              if (signMethod === "Register") {
                async function validRegistration() {
                  let checkReg = await registerUser(username, password);
                  return checkReg;
                }
                validRegistration().then((validity) => {
                  validity === true
                    ? promptArr[2]("Registered Successfully!")
                    : promptArr[1]("Username already exists!");
                });
              } else if (signMethod === "Sign In") {
                async function validLogin() {
                  let checkLog = await logUserIn(username, password);
                  return checkLog;
                }
                validLogin().then((validity) => {
                  validity === true
                    ? promptArr[2]("Signed In Successfully!")
                    : promptArr[1]("Incorrect Username/Password!");
                });
              }
            }
          } else if (result.dismiss === swal.DismissReason.cancel) {
          }
        });
    };
    promptArr.push(credentials);

    const credentialsError = (error) => {
      swal
        .fire({
          icon: "error",
          title: "Oops...",
          text: error,
          showCancelButton: true,
          cancelButtonText: "Back",
        })
        .then((result) => {
          if (result.dismiss === swal.DismissReason.cancel) {
            promptArr[0]();
          }
        });
    };
    promptArr.push(credentialsError);

    const credentialsSuccess = (success) => {
      swal.fire({
        icon: "success",
        title: "Success",
        text: success,
        showCancelButton: false,
      });
    };
    promptArr.push(credentialsSuccess);
    // to call a function just promptArr[desiredCall](params)
    promptArr[0]();
  };

  // function to register new users with unique usernames returns true if a username is available and has now been registered successfully
  const registerUser = async (username, password) => {
    let usernameFree = true;
    const dbref = await firebase
      .database()
      .ref()
      .once("value", (snapshot) => {
        // in the data go to the users key
        const data = snapshot.val().users;
        for (let key in data) {
          // since ther is no ignoreCase method in javaScript use upper instead
          if (username.toUpperCase() === data[key].username.toUpperCase()) {
            usernameFree = false;
            break;
          }
        }
        if (usernameFree === true) {
          const dbRef2 = firebase.database().ref("users/");
          dbRef2.push({
            username: username,
            password: password,
            nominations: [],
          });
          setCurrUser(username);
          setIsLoggedIn(true);
        }
      });
    return usernameFree;
  };

  //function to verify login
  const logUserIn = async (username, password) => {
    let correctSignIn = false;
    const dbref = await firebase
      .database()
      .ref()
      .once("value", (snapshot) => {
        // in the data go to the users key
        const data = snapshot.val().users;
        for (let key in data) {
          if (
            username === data[key].username &&
            password === data[key].password
          ) {
            setCurrUser(username);
            setIsLoggedIn(true);
            correctSignIn = true;
          }
        }
      });
    return correctSignIn;
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
