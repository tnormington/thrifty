import React, { useState } from "react";

import { getDatabase, set, push, ref } from "firebase/database";

import Select from "react-select";

const AddPin = ({ lat, lng }) => {
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
        width: "300px",
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        transform: "translateX(-50%)",
      }}
      onSubmit={addPin}
    >
      <input type="submit" value="Add Pin" />
    </form>
  );
};

export default AddPin;
