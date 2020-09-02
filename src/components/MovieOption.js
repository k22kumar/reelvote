import React, { useState } from "react";

const MovieOption = (props) => {
  const { poster, title, year, id } = props;
  return (
    <ul>
      <li>
        <div>
          <i className="fas fa-award"></i>
          <p>0</p>
        </div>
        <h3>{title}</h3>
      </li>
      <li>
        {
          // if ther is no pic than put default no image available
          poster === "N/A" ? (
            <img
              src={require("../assets/noImageAvailable.jpg")}
              alt={`Poster for: ${title}`}
            />
          ) : (
            <img src={poster} alt={`Poster for: ${title}`} />
          )
        }
      </li>
      <li>
        <button>Nominate</button>
        <p>{year}</p>
      </li>
    </ul>
  );
};

export default MovieOption;
