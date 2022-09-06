import React from "react";

const Pin = ({ color = "red" }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: color,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default Pin;
