import React, { useState } from "react";

const Navigation = (props) => {
  const { handleSearch, handleSignInAndRegister, isLoggedIn } = props;
  // checks for when user clicks to search
  const [userSearching, setUserSearching] = useState(false);
  const [query, setQuery] = useState("");
  //   toggle the default title or search style navigation
  const toggleSearch = () => {
    setUserSearching(!userSearching);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const defferedSearch = (e) => {
    handleSearch(e, query);
  };

  return (
    <nav className=" flexParent flexColumn navigation">
      <h1>The Shoppies</h1>
      <p>Nominate your 5 all time favourite movies!</p>
      <div className="flexParent menuOptions">
        <div className="flexParent searchContainer">
          <form className="flexParent" action="" onSubmit={defferedSearch}>
            <label htmlFor="movieSearch"></label>
            <input
              id="movieSearch"
              className="movieSearch"
              type="search"
              required
              placeholder="Search movies"
              onChange={handleInput}
            />
            <button className="searchButton" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <button className="account" onClick={handleSignInAndRegister}>
          {isLoggedIn === false ? "Sign In/Up" : "Sign Out"}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
