import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import splash from "../../images/splash.gif";

function SplashPage() {
  const history = useHistory();
  const [title] = useState("Lyber | Reliable Rideshare");
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (sessionUser) history.push("/main");
  }, [history, sessionUser]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div className="page-container">
      <h1>Welcome to Lyber</h1>
      <img src={splash} className="splash-gif" alt="Splash Gif"></img>
    </div>
  );
}

export default SplashPage;
