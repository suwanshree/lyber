import React, { useEffect, useState } from "react";
import MapContainer from "./Map";
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
      <MapContainer />
    </div>
  );
}

export default MainPage;
