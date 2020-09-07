import React from "react";
import MovieOption from "./MovieOption";

const SearchResults = (props) => {
  const {
    searchMessage,
    results,
    handleSignInAndRegister,
    isLoggedIn,
    addNomination,
    removeNominee,
    userNominations,
    closeSearch,
  } = props;

    const handleCloseSearch = () => {
      closeSearch();
    };

  return (
    <section className="wrapper">
      <h2>{searchMessage}</h2>
      <div className="flexParent closeContainer">
        <p>Tap "X" to close! </p>
        <button className="toggleSearch" onClick={handleCloseSearch}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      {results.length > 0 &&
      <ul className="flexParent flexWrap"> {results.map((movie, index) => {
          const { Poster, Title, Year, imdbID } = movie;
          return (
            <li>
              <MovieOption
                key={index}
                id={imdbID}
                title={Title}
                poster={Poster}
                year={Year}
                handleSignInAndRegister={handleSignInAndRegister}
                isLoggedIn={isLoggedIn}
                addNomination={addNomination}
                removeNominee={removeNominee}
                userNominations={userNominations}
                tally={0}
              />
            </li>
          );
        })}
      </ul>
        }
    </section>
  );
};

export default SearchResults;
