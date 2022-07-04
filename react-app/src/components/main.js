import React, { useEffect, useState } from "react";
import "./main.css";

function MainPage() {
  const [title] = useState("Lyber | Find a Ride");

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div className="page-container">
      <h1>This is the Main Page</h1>
    </div>
  );
}

export default MainPage;
