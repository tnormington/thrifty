import React, { useEffect, useState } from "react";
import { getDatabase, set, push, ref, onValue } from "firebase/database";

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
  const [pins, setPins] = useState();
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

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {pins && pins.map((pin) => <Pin {...pin} />)}
      </GoogleMapReact>
    </div>
  );
};

export default Maps;
