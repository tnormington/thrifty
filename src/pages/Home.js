import React, { useState } from "react";
import AddPin from "../components/AddPin";

import Map from "../components/Map";

const Home = () => {
  const [zip, setZip] = useState("");

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };
  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          top: "25%",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "60px",
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Thrifty
        </h1>
      </div>
      <input
        type="text"
        value={zip}
        onChange={handleZipChange}
        placeholder="Enter A Zip Code"
      />
      {/* <AddPin /> */}
      <Map />
    </div>
  );
};

export default Home;
