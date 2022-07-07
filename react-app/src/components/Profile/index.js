import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BackToTop from "../BackToTop";
import "./Profile.css";

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
      <h1 id="all-listings">{sessionUser.username}'s Profile Page</h1>
      <BackToTop />
    </div>
  );
}
export default Profile;
