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

const Map = ({ userType }) => {
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

  const handleMapClick = (data) => {
    if (newPin === null && userType === "listing") setNewPin(data);
  };

  const clearNewPin = () => {
    setNewPin(null);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        onClick={handleMapClick}
      >
        {newPin !== null && <NewPin {...newPin} clearNewPin={clearNewPin} />}
        {pins && pins.map((pin) => <Pin {...pin} />)}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
