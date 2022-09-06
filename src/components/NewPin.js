import React from "react";
import NewPinForm from "./NewPinForm";
import Pin from "./Pin";

const NewPin = ({ lat, lng, clearNewPin }) => {
  return (
    <div style={{ zIndex: 10 }}>
      <Pin color="green" outline />
      <NewPinForm lat={lat} lng={lng} clearNewPin={clearNewPin} />
    </div>
  );
};

export default NewPin;
