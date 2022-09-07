import React, { useState, useEffect } from "react";

import Map from "../components/Map";

import { getDatabase, set, push, ref, onValue } from "firebase/database";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddressForm from "../components/AddressForm";
import NewPinForm from "../components/NewPinForm";

const Home = ({ userType, address, setUserType, handleAddressChange }) => {
  const [pins, setPins] = useState();
  const [newPin, setNewPin] = useState(null);
  useEffect(() => {
    const db = getDatabase();
    const pinsRef = ref(db, "pins");
    onValue(pinsRef, (snapshot) => {
      const data = snapshot.val();
      setPins(parsePinData(data));
    });
  }, []);

  const parsePinData = (data) => {
    let result = [];
    for (const key in data) {
      result.push({ ...data[key], key });
    }

    return result;
  };

  const onMapChange = ({ center, zoom, bounds, marginBounds }) => {
    // TODO: maybe use this to lock center when there is a newPin down, I can't figure out if that is good UX
  };

  const handleUserTypeToggle = () => {
    setNewPin(null);
    setUserType(userType === "looking" ? "listing" : "looking");
  };

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
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          zIndex: 10,
          transform: "translateX(-50%)",
          maxWidth: 320,
        }}
      >
        {newPin === null && (
          <AddressForm
            userType={userType}
            handleAddressChange={handleAddressChange}
            address={address}
          />
        )}
        {newPin !== null && (
          <NewPinForm {...newPin} clearNewPin={() => setNewPin(null)} />
        )}
        <ButtonGroup className="w-100 mt-2" aria-label="Select a user type">
          <Button
            active={userType === "looking"}
            variant="primary"
            onClick={handleUserTypeToggle}
          >
            Looking
          </Button>
          <Button
            active={userType === "listing"}
            variant="primary"
            onClick={handleUserTypeToggle}
          >
            Listing
          </Button>
        </ButtonGroup>
      </div>

      <Map
        userType={userType}
        pins={pins}
        newPin={newPin}
        setNewPin={setNewPin}
        onMapChange={onMapChange}
      />
    </div>
  );
};

export default Home;
