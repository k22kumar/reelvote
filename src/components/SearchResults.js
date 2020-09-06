import React, { useState } from "react";
import MovieOption from "./MovieOption";

const SearchResults = (props) => {
  const {
    searchMessage,
    results,
    handleSignInAndRegister,
    isLoggedIn,
    addNomination,
  } = props;
  return (
    <div>
      <h2>{searchMessage}</h2>
      {results.length>0 && results.map((movie, index) => {
        const { Poster, Title, Year, imdbID } = movie;
        return (
          <MovieOption
            key={index}
            id={imdbID}
            title={Title}
            poster={Poster}
            year={Year}
            handleSignInAndRegister={handleSignInAndRegister}
            isLoggedIn={isLoggedIn}
            addNomination={addNomination}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
