import React from "react";
import "./landing.css";
// import landingImg from "../../assets/img/pexels-kulik-stepan-4384147.jpg";
import { DATA } from "../posts/data";

/**
 * @author
 * @function Landing
 **/

const Landing = (props) => {
  return (
    <div className="home_page">
      <section className="landing_page">
        <div className="landing_quote">
          <div className="quotes">
            <span>Music</span>
            <span>is what</span>
            <span>feelings sounds</span>
            <span>like</span>
            <p>Pen down the rainy thoughts of yours, on your favourite music</p>
          </div>
        </div>
        <div className="landing_img">
          {/* <img src={landingImg} alt="landing image" /> */}
        </div>
      </section>
      <section className=""></section>
    </div>
  );
};

export default Landing;
