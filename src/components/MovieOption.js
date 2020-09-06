import React, { useState } from "react";

const MovieOption = (props) => {
  const {
    poster,
    title,
    year,
    id,
    handleSignInAndRegister,
    addNomination,
    isLoggedIn
  } = props;

  const handleNominate = () => {
   addNomination(nominee);
  }
  const nominee = {poster: poster, title: title, id: id, year: year};
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
        <button
          onClick={
            // Is user loggedin? if not ask to sign in, if they are check if the remove func was passed meaning it is an option on the nomination page if not then keep handle func
            isLoggedIn === true ? 
            ( props.removeNominee ? () => {props.removeNominee(nominee)} : handleNominate )
              : handleSignInAndRegister
          }
        >
          Nominate
        </button>
        <p>{year}</p>
      </li>
    </ul>
  );
};

export default MovieOption;
