import React, { useState } from "react";
import MovieOption from "./MovieOption";

const SearchResults = (props) => {
  const { searchMessage, results } = props;

  return (
    <div>
      <h2>{searchMessage}</h2>
      {results.map((movie, index) => {
        const { Poster, Title, Year, imdbID } = movie;
        return (
          <MovieOption
            key={index}
            id={imdbID}
            title={Title}
            poster={Poster}
            year={Year}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
