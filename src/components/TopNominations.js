import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// carosel for the top nominations
const TopNominations = (props) => {
  const { publicNominations } = props;

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
          const { title, poster, tally } = nomObj;
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
                <li className="topDetails flexParent">
                  <div className="detailCard">
                    <p>#{index + 1}</p>
                    <p>
                      <i className="fas fa-award"></i>
                      {tally}
                    </p>
                    <p className="topTitle">{title}</p>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default TopNominations;
