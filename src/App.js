import { useState, useRef, useEffect, useCallback } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./firebaseConfig";
import { Button } from "react-bootstrap";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("looking");
  const [maps, setMaps] = useState();
  const [center, setCenter] = useState();
  const [addressInputNode, setAddressInputNode] = useState();

  const addressInputRef = useCallback((el) => {
    setAddressInputNode(el);
  }, []);
  const autoCompleteRef = useRef();

  const setupAutoComplete = () => {
    if (!maps?.places?.Autocomplete) return;

    if (!addressInputNode) return;

    autoCompleteRef.current = new maps.places.Autocomplete(addressInputNode, {
      componentRestrictions: { country: ["us"] },
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });

    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      if (place) handlePlaceChange(place);
    });
  };

  const handlePlaceChange = ({ geometry, address_components }) => {
    setCenter([geometry.location.lat(), geometry.location.lng()]);
    setAddress(address_components);
  };

  // run the Autocomplete setup when either maps or addressInputNode changes to ensure it is successful
  useEffect(setupAutoComplete, [maps, addressInputNode]);

  const handleGoogleApiLoaded = (map, maps) => {
    setMaps(maps);
  };

  const logout = (e) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ position: "absolute", width: "100%" }}>
        <Link to="/">Home</Link>
        {!user && <Link to="/signup">Login</Link>}
        {user && (
          <Button variant="link" onClick={logout}>
            Sign Out
          </Button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userType={userType}
              address={address}
              setUserType={setUserType}
              handleGoogleApiLoaded={handleGoogleApiLoaded}
              addressInputRef={addressInputRef}
              center={center}
              setCenter={setCenter}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup auth={auth} user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
