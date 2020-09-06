import React, { useState } from "react";

const Navigation = (props) => {
  const { handleSearch, closeSearch, handleSignInAndRegister, isLoggedIn } = props;
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
    <nav>
      <button>Menu</button>
      {!userSearching && (
        <div>
          <button onClick={toggleSearch}>
            <i className="fas fa-search"></i>
          </button>
          <h1>Shoppies</h1>
          <button onClick={handleSignInAndRegister}>{
            isLoggedIn === false ?
             "Sign In/Up" :
             "Sign Out" 
          }</button>
        </div>
      )}
      {userSearching && (
        <div>
          <form action="" onSubmit={defferedSearch}>
            <label htmlFor="movieSearch"></label>
            <input
              id="movieSearch"
              type="search"
              required
              placeholder="Search movies"
              onChange={handleInput}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <button onClick={handleCloseSearch}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
