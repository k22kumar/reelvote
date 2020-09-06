
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// carosel for the top nominations
const TopNominations = (props) => {

    const {publicNominations} = props;
    console.log("sup", publicNominations);
    console.log("no", publicNominations[0]);

    return (
      <section className="topNominations">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          swipeable={true}
          dynamicHeight={false}
          showStatus={false}
        >
          {publicNominations.slice(0, 3).map((nomObj, index) => {
              const {title, id, poster, tally} = nomObj;
              return (
                <div className="flexParent topContainer">
                  <ul className="flexParent">
                    <li className="flexParent imgLI">
                      <div className="flexParent topImgContainer">
                        {poster === "N/A" ? (
                          <img
                            src={require("../assets/noImageAvailable.jpg")}
                            alt={`Poster for: ${title}`}
                          />
                        ) : (
                          <img src={poster} alt={`Poster for: ${title}`} />
                        )}
                      </div>
                    </li>
                    <li className="topDetails">
                      <p>{tally}</p>
                      <p>{title}</p>
                    </li>
                  </ul>
                </div>
              );
          })}
        </Carousel>
      </section>
    );
}

export default TopNominations;

