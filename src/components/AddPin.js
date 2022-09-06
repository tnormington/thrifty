import React, { useState } from "react";

import { getDatabase, set, push, ref } from "firebase/database";

const AddPin = () => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const addPin = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const pinListRef = ref(db, "pins");
    const newPinRef = push(pinListRef);
    set(newPinRef, {
      lat,
      lng,
    });
  };

  return (
    <form
      style={{
        position: "absolute",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        bottom: 100,
        zIndex: 3,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onSubmit={addPin}
    >
      <input
        type="text"
        value={lat}
        placeholder="Lat"
        onChange={(e) => {
          setLat(e.target.value);
        }}
      />
      <input
        type="text"
        value={lng}
        placeholder="Lng"
        onChange={(e) => {
          setLng(e.target.value);
        }}
      />
      <input type="submit" value="Add Pin" />
    </form>
  );
};

export default AddPin;
