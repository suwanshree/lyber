import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import DemoButton from "../auth/DemoButton";
import Profile from "./Profile";
import logo from "../../images/logo.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <ul className="logged-in-nav">
        <li className="listings-button" id="nav-buttons">
          <NavLink to="/main" exact={true} className="listings">
            <i id="nav-icons" className="fa-solid fa-car-on"></i>
            <p id="nav-text">Ride</p>
          </NavLink>
        </li>
        <li className="listings-button" id="nav-buttons">
          <Profile />
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <ul className="logged-out-nav">
        <li className="listings-button" id="nav-buttons">
          <LoginModal />
        </li>
        <li className="listings-button" id="nav-buttons">
          <SignupModal />
        </li>
        <li className="listings-button" id="nav-buttons">
          <DemoButton />
        </li>
      </ul>
    );
  }

  return (
    <nav className="nav-container">
      <ul className="static-nav">
        <li>
          <NavLink
            to="/"
            exact={true}
            className="home-button"
            id="nav-buttons"
            activeClassName="active"
          >
            <h3 id="home-button">Lyber</h3>
            <img src={logo} className="logo-image" alt="Site Logo"></img>
          </NavLink>
        </li>
      </ul>
      {sessionLinks}
    </nav>
  );
};

export default NavBar;
