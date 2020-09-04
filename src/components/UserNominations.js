import React, { useState } from "react";

const UserNominations = (props) => {
    const { userNominations } = props;
    console.log("nominees are ", userNominations);
    return (
        <div>
            <h2>Your Nominations</h2>
            {userNominations.length === 0 && (<p>You havent picked any nominees yet!</p>)}
            {userNominations.length > 0 && (<ul></ul>)}
        </div>
    )
}

export default UserNominations;
