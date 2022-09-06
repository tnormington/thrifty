import React from "react";

const Pin = ({ color = "red", outline = false }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: !outline ? color : "transparent",
        border: `2px solid ${color}`,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default Pin;
