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

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
      style: maps.MapTypeControlStyle.DEFAULT,
    },
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: true,
    gestureHandling: "greedy",
  };
}

const Map = ({
  userType,
  pins,
  newPin,
  setNewPin,
  onMapChange,
  handlePinClick,
  activePin,
  setActivePin,
  latOffset,
  filters,
  center,
  handleGoogleApiLoaded,
}) => {
  const handleMapClick = (data) => {
    if (newPin === null && userType === "listing") setNewPin(data);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          libraries: ["places"],
        }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        onClick={handleMapClick}
        center={center}
        onChange={onMapChange}
        zoom={newPin !== null ? 15 : null}
        onChildClick={handlePinClick}
        onGoogleApiLoaded={({ map, maps }) => handleGoogleApiLoaded(map, maps)}
        yesIWantToUseGoogleMapApiInternals={true}
        options={createMapOptions}
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
              <Pin
                {...pin}
                key={pin.key}
                isActive={activePin !== null && activePin === pin.key}
                closePin={(e) => {
                  e.stopPropagation();
                  setActivePin(null);
                }}
              />
            ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
