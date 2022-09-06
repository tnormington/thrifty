import React from "react";
import AddPin from "./AddPin";
import Pin from "./Pin";

const NewPinForm = ({ lat, lng }) => {
  return (
    <div>
      <Pin color="green" />
      <AddPin lat={lat} lng={lng} />
    </div>
  );
};

export default NewPinForm;
