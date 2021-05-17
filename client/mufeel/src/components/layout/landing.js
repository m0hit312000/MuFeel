import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import landing from "../../assets/img/pexels-koolshooters-6980880.jpg";
import { DATA } from "../posts/data";

/**
 * @author
 * @function Landing
 **/

const Landing = (props) => {
  const MaxView = () => {
    var max = 0,
      id;
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].views > max) {
        max = i;
        id = DATA[i].id;
      }
    }
    return DATA.filter((post) => post.id == id).map((post) => (
      <div className="most_viewed">
        <div className="mv_img">
          <img
            src={`../../assets/img/${post.postImg}`}
            alt={`${post.postImg}`}
          />
        </div>
        <div className="mv_post">
          <h2>{post.title}</h2>
          <h4>by {post.author}</h4>
          <p>{post.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="home_page">
      <section className="landing_page">
        <div className="landing_quote">
          <div className="quotes">
            <span>Music</span>
            <span>is what</span>
            <span>feelings sounds</span>
            <span>like</span>
          </div>
        </div>
        <h1 className="brand">muFeel</h1>
        <div className="landing_intro">
          <div className="landing_img">
            <img src={landing} alt="landing image" />
          </div>
          <div className="get_started">
            <p>
              Pen down the rainy thoughts of yours, on your favourite music and
              let your heart speak it for you
            </p>
            <button>
              <Link to="/signup">Get Started</Link>
            </button>
          </div>
        </div>
      </section>
      {/* <section className="most_viewed">
        <MaxView />
      </section> */}
    </div>
  );
};

export default Landing;
