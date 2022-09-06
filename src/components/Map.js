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

const Maps = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      />
    </div>
  );
};

export default Maps;
