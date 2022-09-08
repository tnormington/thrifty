import React, { useState, useEffect } from "react";

import Map from "../components/Map";

import { getDatabase, ref, onValue } from "firebase/database";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddressForm from "../components/AddressForm";
import NewPinForm from "../components/NewPinForm";
import PinFilters from "../components/PinFilters";

import { SALE_TYPES, LOOT_TYPES } from "../constants";

const defaultFilters = {
  saleTypes: SALE_TYPES.map((t) => t.label),
  lootTypes: LOOT_TYPES.map((t) => t.label),
};

const Home = ({
  userType,
  address,
  setUserType,
  handleAddressChange,
  handleGoogleApiLoaded,
  addressInputRef,
  center,
  setCenter,
}) => {
  const [pins, setPins] = useState();
  const [newPin, setNewPin] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [latOffset, setLatOffset] = useState();
  const [filters, setFilters] = useState({ ...defaultFilters });

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

  const onMapChange = ({ center, zoom, bounds, marginBounds, size }) => {
    // get the latitude offset in pixels, this value is used to offset the map bounds when centering on a newPin
    setLatOffset((200 * (bounds.nw.lat - bounds.se.lat)) / size.height);
  };

  const handleUserTypeChange = (type) => {
    setNewPin(null);
    setActivePin(null);
    setUserType(userType === type ? null : type);
  };

  const handlePinClick = (id) => {
    setActivePin(id);
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
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
            fontFamily: "'Lobster', cursive",
            fontWeight: 400,
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Thrifty
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          zIndex: 10,
          transform: "translateX(-50%)",
          maxWidth: 420,
          width: "100%",
          padding: 10,
        }}
      >
        {newPin === null &&
          (userType === "listing" || userType === "looking") && (
            <AddressForm
              userType={userType}
              handleAddressChange={handleAddressChange}
              address={address}
              addressInputRef={addressInputRef}
            />
          )}
        {newPin !== null && (
          <NewPinForm {...newPin} clearNewPin={() => setNewPin(null)} />
        )}
        {userType === "filtering" && (
          <PinFilters
            filters={filters}
            setFilters={setFilters}
            reset={resetFilters}
            close={() => setUserType(null)}
          />
        )}
        <ButtonGroup className="w-100 mt-2" aria-label="Select a user type">
          <Button
            active={userType === "looking"}
            variant="primary"
            size="lg"
            onClick={() => handleUserTypeChange("looking")}
          >
            Looking
          </Button>
          <Button
            size="lg"
            active={userType === "listing"}
            variant="primary"
            onClick={() => handleUserTypeChange("listing")}
          >
            Listing
          </Button>
          <Button
            size="lg"
            active={userType === "filtering"}
            variant="primary"
            onClick={() => handleUserTypeChange("filtering")}
          >
            Filter
          </Button>
        </ButtonGroup>
      </div>

      <Map
        userType={userType}
        pins={pins}
        newPin={newPin}
        setNewPin={setNewPin}
        onMapChange={onMapChange}
        handlePinClick={handlePinClick}
        activePin={activePin}
        setActivePin={setActivePin}
        latOffset={latOffset}
        filters={filters}
        center={center}
        setCenter={setCenter}
        handleGoogleApiLoaded={handleGoogleApiLoaded}
      />
    </div>
  );
};

export default Home;
