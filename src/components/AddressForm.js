import React from "react";

import Form from "react-bootstrap/Form";

const AddressForm = ({ userType, handleAddressChange, address }) => {
  return (
    <>
      {userType !== null && (
        <div
          className="shadow"
          style={{
            padding: "24px",
            textAlign: "center",
            borderRadius: 4,
            background: "#fff",
            display: "inline-block",
            pointerEvents: "auto",
          }}
        >
          {userType === "listing" && (
            <>
              <p>
                Click anywhere to drop a pin, or enter an address below to list
                a sale.
              </p>
              <Form.Control
                type="text"
                placeholder="Enter an Address or Zip Code"
                value={address}
                onChange={handleAddressChange}
              />
            </>
          )}
          {userType === "looking" && (
            <>
              <p>Enter an address or zip code to start looking for sales.</p>
              <Form.Control
                type="text"
                placeholder="Enter an Address or Zip Code"
                value={address}
                onChange={handleAddressChange}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AddressForm;
