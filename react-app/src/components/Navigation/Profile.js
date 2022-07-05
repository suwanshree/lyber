import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import { ProfileModal } from "../../context/ProfileModal";

function Profile() {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button className="User-Profile" onClick={() => setShowModal(true)}>
        <i id="nav-icons" className="fa-solid fa-user"></i>
        <p id="nav-text">Profile</p>
      </button>
      {showModal && (
        <ProfileModal onClose={() => setShowModal(false)}>
          <div>
            <ul className="profile-dropdown">
              <li>
                <strong>User Id:</strong> {user.id}
              </li>
              <li>
                <strong>Username:</strong> {user.username}
              </li>
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li id="profile-listing">
                <NavLink
                  to="/profile"
                  exact={true}
                  onClick={() => setShowModal(false)}
                >
                  Profile
                </NavLink>
              </li>
              <li id="profile-logout">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </ProfileModal>
      )}
    </>
  );
}

export default Profile;
