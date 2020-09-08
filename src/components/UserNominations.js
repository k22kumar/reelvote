import React, { useEffect, useState } from "react";
import MovieOption from "./MovieOption.js";

const UserNominations = (props) => {
  const { userNominations, removeNominee } = props;
  const [theNominations, setTheNominations] = useState(userNominations);
  useEffect(() => {
    setTheNominations(userNominations);
  }, [userNominations]);
  return (
    <div className="wrapper userNominations">
      <h2>Your Nominations</h2>
      {theNominations.length === 0 && (
        <p>You havent picked any nominees yet!</p>
      )}
      {theNominations.length > 0 && (
        <ul className="flexParent flexWrap">
          {theNominations.map((nominee, index) => {
            const { poster, title, year, id } = nominee;
            return (
              <li>
                <MovieOption
                  key={index}
                  poster={poster}
                  title={title}
                  id={id}
                  year={year}
                  removeNominee={removeNominee}
                  userNominations={theNominations}
                  tally={0}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserNominations;
