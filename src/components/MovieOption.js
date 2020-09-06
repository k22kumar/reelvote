import React, { useState, useEffect } from "react";

const MovieOption = (props) => {
  const [isNominee, setIsNominee] = useState(false);

  const {
    poster,
    title,
    year,
    id,
    handleSignInAndRegister,
    addNomination,
    isLoggedIn,
    userNominations,
    removeNominee,
    tally,
  } = props;

  useEffect(() => {
    if (userNominations.length > 0) {
      userNominations.map((nomObj) => {
        if (nomObj.id === id) {
          setIsNominee(true);
        }
      });
    }
  }, [userNominations]);

  const handleNominate = () => {
    addNomination(nominee);
    setIsNominee(true);
  };

  const handleRemoveNominee = () => {
    removeNominee(nominee);
    setIsNominee(false);
  };

  const nominee = {
    poster: poster,
    title: title,
    id: id,
    year: year,
    tally: tally,
  };
  return (
    <ul className="flexParent flexColumn movieOption">
      <li className="flexParent imgContainer">
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
      <li className="movieDetails">
        <h3>{title}</h3>
        <p>{year}</p>
      </li>
      {tally > 0 && (
        <li className="flexParent tally">
          <i className="fas fa-award"></i>
          <p>{tally}</p>
        </li>
      )}
      <li className="nominateButton">
        {isNominee === true && (
          <button className="swal2-styled" onClick={handleRemoveNominee}>
            Remove
          </button>
        )}
        {isNominee === false && (
          <button
            className="swal2-styled"
            onClick={
              // Is user loggedin? if not ask to sign in, if they are check if the remove func was passed meaning it is an option on the nomination page if not then keep handle func
              isLoggedIn === true ? handleNominate : handleSignInAndRegister
            }
          >
            Nominate
          </button>
        )}
      </li>
    </ul>
  );
};

export default MovieOption;
