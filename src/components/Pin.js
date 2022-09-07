import React from "react";
import { SALE_TYPES } from "../constants";

import "./Pin.css";

const Pin = ({
  saleType = "Garage/Yard Sale",
  startDateTime,
  endDateTime,
  lootTypes,
  isNewPin,
}) => {
  // get color class based on sale type
  const color = SALE_TYPES.find((t) => t.label === saleType).color;
  const size = isNewPin ? "30px" : "20px";

  return (
    <div
      className={`pin ${isNewPin ? "pin-pulse" : ""} bg-${
        !isNewPin ? color : "white"
      } border-${color}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: "2px",
        transform: "translate(-50%, -50%)",
        position: "relative",
        zIndex: -1,
      }}
    ></div>
  );
};

export default Pin;
