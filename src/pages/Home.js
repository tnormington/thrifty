import React, { useState } from "react";

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Thrifty</h1>
        <input
          type="text"
          value={zip}
          onChange={handleZipChange}
          placeholder="Zip Code"
        />
      </div>
      <Map />
    </div>
  );
};

export default Home;
