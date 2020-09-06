import React from "react";
import MovieOption from "./MovieOption.js";

const UserNominations = (props) => {
  const { userNominations, removeNominee } = props;
  return (
    <div>
      <h2>Your Nominations</h2>
      {userNominations.length === 0 && (
        <p>You havent picked any nominees yet!</p>
      )}
      {userNominations.length > 0 && (
        <ul>
          {userNominations.map((nominee, index) => {
            const { poster, title, year, id } = nominee;
            return (
              <MovieOption
                key={index}
                poster={poster}
                title={title}
                id={id}
                year={year}
                removeNominee={removeNominee}
                userNominations={userNominations}
                tally={0}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserNominations;
