import React from "react";

import GoogleMapReact from "google-map-react";

const defaultMapProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Maps = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <GoogleMapReact
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      />
    </div>
  );
};

export default Maps;
