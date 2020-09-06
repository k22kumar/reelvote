import React, { useState } from "react";

const Navigation = (props) => {
  const {
    handleSearch,
    closeSearch,
    handleSignInAndRegister,
    isLoggedIn,
  } = props;
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

  const handleCloseSearch = () => {
    toggleSearch();
    closeSearch();
  };

  const defferedSearch = (e) => {
    handleSearch(e, query);
  };

  return (
    <nav className="flexParent navigation">
      <button className="account" onClick={handleSignInAndRegister}>
        {isLoggedIn === false ? "Sign In/Up" : "Sign Out"}
      </button>
      {!userSearching && <h1>Shoppies</h1>}
      {userSearching && (
        <div className="flexParent searchContainer">
          <form className="flexParent" action="" onSubmit={defferedSearch}>
            <label htmlFor="movieSearch"></label>
            <input
              id="movieSearch"
              type="search"
              required
              placeholder="Search movies"
              onChange={handleInput}
            />
            <button class="searchButton" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      )}
      {userSearching && (
        <button className="toggleSearch" onClick={handleCloseSearch}>
          <i className="fas fa-times"></i>
        </button>
      )}
      {!userSearching && (
        <button className="toggleSearch" onClick={toggleSearch}>
          <i className="fas fa-search"></i>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
