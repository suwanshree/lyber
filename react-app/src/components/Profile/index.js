import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BackToTop from "../BackToTop";
import "./Profile.css";
import defaultMap from "../../images/defaultmap.png";

function Profile() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [title] = useState(`Lyber Profile | ${sessionUser.username}`);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [history, sessionUser]);

  return (
    <div className="page-container">
      <h1 id="all-listings">Your ride history</h1>
      <div className="rides-container">
        <div className="single-ride">
          <div className="ride-details">
            <p>
              <b>Date: 5/10/2022</b>
            </p>
            <p>From: Location A</p>
            <p>To: Location B</p>
            <p>Fare: $10.00</p>
          </div>
          <img src={defaultMap} className="default-map" alt="Ride Map"></img>
        </div>
        <div className="single-ride">
          <div className="ride-details">
            <p>
              <b>Date: 6/10/2022</b>
            </p>
            <p>From: Location C</p>
            <p>To: Location D</p>
            <p>Fare: $15.00</p>
          </div>
          <img src={defaultMap} className="default-map" alt="Ride Map"></img>
        </div>
        <div className="single-ride">
          <div className="ride-details">
            <p>
              <b>Date: 7/10/2022</b>
            </p>
            <p>From: Location E</p>
            <p>To: Location F</p>
            <p>Fare: $20.00</p>
          </div>
          <img src={defaultMap} className="default-map" alt="Ride Map"></img>
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
export default Profile;
