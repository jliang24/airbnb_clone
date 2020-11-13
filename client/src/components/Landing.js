import React from "react";
import "css/landing.css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="pusher">
      <div
        id="landing"
        className="ui vertical inverted masthead center aligned segment"
      >
        <div className="ui text container">
          <h1 className="ui inverted header">airbnb clone</h1>
          <h2>
            Find adventures nearby or in faraway places and access unique homes,
            experiences, and places around the world.
          </h2>
          <Link className="ui huge positive button" to="/signup">
            <i className="pencil icon"></i>Sign up
          </Link>
          <Link className="ui huge primary button" to="/listings">
            View Listings <i className="right arrow icon"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
