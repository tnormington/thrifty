import React from "react";

import GoogleMapReact from "google-map-react";

import Pin from "./Pin";

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
  handlePinClick,
  activePin,
  latOffset,
  filters,
}) => {
  const handleMapClick = (data) => {
    if (newPin === null && userType === "listing") setNewPin(data);
  };

  return (
    <div style={{ height: "calc(100vh - 60px)", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        onClick={handleMapClick}
        center={newPin !== null ? [newPin.lat - latOffset, newPin.lng] : false}
        onChange={onMapChange}
        zoom={newPin !== null ? 15 : null}
        onChildClick={handlePinClick}
        options={{
          gestureHandling: "greedy",
        }}
      >
        {newPin !== null && <Pin {...newPin} key="newPinKey" isNewPin />}
        {pins &&
          pins
            .filter((pin) => {
              if (!pin.saleType) return false;

              if (!filters.saleTypes.includes(pin.saleType)) return false;
              if (
                pin.lootTypes &&
                !filters.lootTypes.some((t) =>
                  pin.lootTypes.split(", ").includes(t)
                )
              )
                return false;

              return true;
            })
            .map((pin) => (
              <Pin {...pin} key={pin.key} isActive={activePin === pin.key} />
            ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
