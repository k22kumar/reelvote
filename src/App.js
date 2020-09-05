import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Navigation from "./components/Navigation";
import SearchResults from "./components/SearchResults";
import UserNominations from "./components/UserNominations";
import firebase from "./components/Firebase";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const App = () => {
  // state variables
  // search results
  const [results, setResults] = useState([]);
  // check if user is searching
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [userNominations, setUserNominations] = useState([]);
  // boolean to check if user has 5 nominees assume not full
  const [fiveNominees, setFiveNominees] = useState(false);

  // functions


  // hook to update users page when loggedin
  useEffect(() => {
    async function waitForDownload() {
      let download = await downloadUserNominations();
      return download;
    }
    waitForDownload().then((status) => {
      console.log(status);
    });
  }, [currUser]);

  // function to run when component mounts (ie gather user data and new nominations)
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (snapshot) => {
      // const nominationsdata = snapshot.val().allNominations;
      // const updatedNominations = [];
      // for(let key in nominationsdata) {
      //   updatedNominations.push(data[key]);
      // };
      // update loggedin users personal nominations
      if (isLoggedIn === true) {
        const updatedUserNominations = [];
        const users = snapshot.val().users;
        for (let key in users) {
          if (users[key].username === currUser) {
            if (users[key].username.nominations) {
              // check if user has five nominees
              if (users[key].username.nominations.length === 5) {
                setFiveNominees(true);
              }
              // update the nominee list
              for (
                let i = 0;
                i < users[key].username.nominations.length - 1;
                i++
              ) {
                updatedUserNominations.push(users[key].username.nominations[i]);
              }
            }
            setUserNominations(updatedUserNominations);
            break;
          }
        }
      }
    });
  }, []);

  const handleSearch = (e, query) => {
    setResults([]);
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

  const addNomination = (nominee) => {
    const dbRef = firebase.database().ref();
    let userKey = "";
    dbRef.once("value", (snapshot) => {
      const data = snapshot.val().users;
      // if not full nominations
      if (fiveNominees === false) {
        for (let key in data) {
          if (currUser.toUpperCase() === data[key].username.toUpperCase()) {
            userKey = key;
            break;
          }
        }
      } else {
        swal
      }
    });
    const newNominations = userNominations;
    newNominations.push(nominee);
    const userRef = dbRef.child("users").child(userKey);
    userRef.update({ nominations: newNominations });
    updateAllNominations(nominee);
  };

  const updateAllNominations = (nominee) => {
    const { poster, title, year, id } = nominee;
    const dbRef = firebase.database().ref();
    const allNomRef = dbRef.child("allNominations");
    dbRef.once("value", (snapshot) => {
      const data = snapshot.val().allNominations;
      let nomKey = "";
      for (let key in data) {
        if (nominee.id === data[key].id) {
          nomKey = key;
          break;
        }
      }
    });
    if(nomKey !== ""){
      const prevVal = allNomRef.child(nomKey).tally;
      allNomRef.child(nomKey).update({ tally: prevVal + 1 });
    } else {
      allNomRef.push({
        poster: poster,
        title: title,
        year: year,
        id: id,
        tally: 0
      });
    }
  };

  const handleSignInAndRegister = () => {
    if (isLoggedIn === true) {
      window.location.reload(true);
    } else {
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
    }
  };

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
                  // console.log("1 validity user is ", currUser);
                  validity === true
                    ? promptArr[2]("Signed In Successfully!")
                    : promptArr[1]("Incorrect Username/Password!");
                  // console.log("2 validity user is ", currUser);
                  // async function waitForDownload() {
                  //   let download = await downloadUserNominations();
                  //   return download;
                  // }
                  // waitForDownload().then((status) => {
                  //   console.log(status);
                  // });
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
      // if (validity === true) {
      //   console.log("plezaa", validity);
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

  // downloads the users nominations
  const downloadUserNominations = async () => {
    let newStuff = [];
    const dbRef = await firebase
      .database()
      .ref()
      .once("value", (snapshot) => {
        // in the data go to the users key
        const data = snapshot.val().users;
        for (let key in data) {
          // when they log in set each users nominations
          console.log(
            `currUser: ${currUser} datakeyusernam: ${data[key].username}`
          );
          if (currUser.toUpperCase() === data[key].username.toUpperCase()) {
            console.log("yo stuff", data[key].nominations);
            if (data[key].nominations) {
              setUserNominations(data[key].nominations);
              newStuff = userNominations;
            }
          }
        }
      });
    return newStuff;
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
        isLoggedIn={isLoggedIn}
        handleSearch={handleSearch}
        closeSearch={closeSearch}
        handleSignInAndRegister={handleSignInAndRegister}
      />
      {isSearching && (
        <SearchResults
          results={results}
          searchMessage={searchMessage}
          handleSignInAndRegister={handleSignInAndRegister}
          addNomination={addNomination}
          isLoggedIn={isLoggedIn}
        />
      )}
      {isSearching === false && isLoggedIn === true && (
        <UserNominations userNominations={userNominations} />
      )}
    </div>
  );
};

export default App;
