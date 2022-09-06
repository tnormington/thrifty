import React, { useState } from "react";

import Map from "../components/Map";

const bigButtonStyle = {
  width: 100,
  height: 100,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 10px",
};

const Home = ({ userType, address, setUserType, handleAddressChange }) => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          top: 16,
          width: "100%",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Thrifty
        </h1>
        {userType === null && (
          <div style={{ pointerEvents: "auto", marginBottom: 10 }}>
            <button
              style={bigButtonStyle}
              onClick={() => setUserType("looking")}
            >
              Looking
            </button>
            <button
              style={bigButtonStyle}
              onClick={() => setUserType("listing")}
            >
              Listing
            </button>
          </div>
        )}
        {userType !== null && (
          <div
            style={{
              padding: "4px 24px",
              borderRadius: 4,
              background: "#fff",
              display: "inline-block",
              pointerEvents: "auto",
            }}
          >
            {userType === "listing" && (
              <>
                <p>
                  Click anywhere to drop a pin, or enter an address below to
                  list a sale.
                  <br /> To search for sales, click{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType("looking");
                    }}
                  >
                    here
                  </button>
                </p>
                <input
                  style={{ marginBottom: 10, width: "100%" }}
                  type="text"
                  placeholder="Enter an Address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </>
            )}
            {userType === "looking" && (
              <>
                <p>
                  Enter an address or zip code to start looking for sales.
                  <br /> To list a sale, click{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType("listing");
                    }}
                  >
                    here
                  </button>
                </p>
                <input
                  style={{ marginBottom: 10, width: "100%" }}
                  type="text"
                  placeholder="Address or Zip Code"
                  value={address}
                  onChange={handleAddressChange}
                />
              </>
            )}
          </div>
        )}
      </div>
      <Map userType={userType} />
    </div>
  );
};

export default Home;
