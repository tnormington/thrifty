import React from "react";

import GoogleMapReact from "google-map-react";
import { googleMapKey } from "../keys";

const defaultMapProps = {
  center: {
    lat: 43.2177483,
    lng: -70.8742631,
  },
  zoom: 13,
};

const Pin = () => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "red",
      }}
    ></div>
  );
};

const Maps = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        <Pin lat={43.2318706} lng={-70.8997593} />
      </GoogleMapReact>
    </div>
  );
};

export default Maps;
