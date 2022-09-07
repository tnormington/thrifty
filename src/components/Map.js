import React, { useEffect, useState } from "react";
import { getDatabase, set, push, ref, onValue } from "firebase/database";

import GoogleMapReact from "google-map-react";
import { googleMapKey } from "../keys";

import Pin from "./Pin";
import NewPin from "./NewPin";

const defaultMapProps = {
  center: {
    lat: 43.2177483,
    lng: -70.8742631,
  },
  zoom: 13,
};

const Map = ({
  userType,
  pins,
  newPin,
  setNewPin,
  onMapChange,
  handleHoverPin,
  hoveredPin,
  handlePinClick,
  activePin,
  latOffset,
}) => {
  const handleMapClick = (data) => {
    if (newPin === null && userType === "listing") setNewPin(data);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        onClick={handleMapClick}
        center={newPin !== null ? [newPin.lat - latOffset, newPin.lng] : false}
        onChange={onMapChange}
        zoom={newPin !== null ? 15 : null}
        // onChildMouseEnter={handleHoverPin}
        // onChildMouseLeave={handleHoverPin}
        onChildClick={handlePinClick}
        options={{
          gestureHandling: "greedy",
        }}
      >
        {newPin !== null && <Pin {...newPin} key="newPinKey" isNewPin />}
        {pins &&
          pins.map((pin) => (
            <Pin
              key={pin.key}
              {...pin}
              isHovered={hoveredPin === pin.key}
              isActive={activePin === pin.key}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
