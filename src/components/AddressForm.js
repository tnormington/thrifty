import React from "react";

const AddressForm = ({ userType, addressInputRef }) => {
  return (
    <div
      className="shadow"
      style={{
        padding: "24px",
        textAlign: "center",
        borderRadius: 4,
        background: "#fff",
        pointerEvents: "auto",
      }}
    >
      {userType === "listing" && (
        <p>
          Click anywhere to drop a pin, or enter an address below to list a
          sale.
        </p>
      )}
      {userType === "looking" && (
        <p>Enter an address to find sales in the area.</p>
      )}
      <form autoComplete="off">
        <input
          className="form-control"
          type="text"
          ref={addressInputRef}
          autoComplete="off"
          placeholder="Enter an Address"
        />
      </form>
    </div>
  );
};

export default AddressForm;
