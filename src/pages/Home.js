import React, { useState } from "react";

const Home = () => {
  const [zip, setZip] = useState("");

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };
  return (
    <div>
      <h1>Thrifty</h1>
      <input
        type="text"
        value={zip}
        onChange={handleZipChange}
        placeholder="Zip Code"
      />
    </div>
  );
};

export default Home;
