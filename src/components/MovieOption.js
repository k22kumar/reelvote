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
    removeNominee
  } = props;

  useEffect(() => {
    if(userNominations.length>0){
      userNominations.map((nomObj) => {
        if(nomObj.id === id) {
          setIsNominee(true);
        }
      })
    }
  }, [userNominations]);

  const handleNominate = () => {
   addNomination(nominee);
   setIsNominee(true);
  }

  const handleRemoveNominee = () => {
    removeNominee(nominee);
    setIsNominee(false);
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
        {isNominee === true && (
          <button onClick={handleRemoveNominee}>Remove</button>
        )}
        {isNominee === false && (
          <button
            onClick={
              // Is user loggedin? if not ask to sign in, if they are check if the remove func was passed meaning it is an option on the nomination page if not then keep handle func
              isLoggedIn === true ? handleNominate : handleSignInAndRegister
            }>
            Nominate
          </button>
        )}
        <p>{year}</p>
      </li>
    </ul>
  );
};

export default MovieOption;
