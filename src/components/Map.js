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
        center={newPin !== null ? [newPin.lat, newPin.lng] : false}
        onChange={onMapChange}
        zoom={newPin !== null ? 15 : null}
        onChildMouseEnter={handleHoverPin}
        onChildMouseLeave={handleHoverPin}
        onChildMouseDown={handlePinClick}
      >
        {newPin !== null && <Pin {...newPin} isNewPin />}
        {pins &&
          pins.map((pin) => (
            <Pin
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
