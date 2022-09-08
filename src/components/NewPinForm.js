import React, { useState } from "react";

import { getDatabase, set, push, ref } from "firebase/database";

import Select from "react-select";
import DateTimePicker from "react-datetime-picker";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { SALE_TYPES, LOOT_TYPES } from "../constants";

const NewPinForm = ({ lat, lng, clearNewPin }) => {
  const [saleType, setSaleType] = useState();
  const [lootTypes, setLootTypes] = useState();
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [address, setAddress] = useState();

  const addPin = (e) => {
    e.preventDefault();
    const db = getDatabase();
    const pinListRef = ref(db, "pins");
    const newPinRef = push(pinListRef);
    set(newPinRef, {
      lat,
      lng,
      saleType: saleType.value,
      lootTypes: lootTypes.map((t) => t.label).join(", "),
      startDateTime: startDateTime.toString(),
      endDateTime: endDateTime.toString(),
    });
    clearNewPin();
  };

  return (
    <Form
      style={{
        // maxWidth: "420px",
        width: "100%",
        display: "flex",
        // margin: "0 10px 0 10px",
        flexDirection: "column",
        zIndex: 3,
        padding: 10,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
        borderRadius: 3,
      }}
    >
      <Form.Group className="mb-3">
        <Select
          isSearchable={false}
          menuPlacement="auto"
          onChange={(val) => setSaleType(val)}
          placeholder="Select A Type of Sale"
          options={SALE_TYPES.map(({ label }) => ({
            label,
            value: label,
          }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Select
          isSearchable={false}
          onChange={(val) => setLootTypes(val)}
          isMulti
          menuPlacement="auto"
          closeMenuOnSelect={false}
          placeholder="What are you selling?"
          options={LOOT_TYPES.map(({ label }) => ({ label, value: label }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Starts at</Form.Label>
        <DateTimePicker
          onChange={(val) => setStartDateTime(val)}
          value={startDateTime}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ends at</Form.Label>
        <DateTimePicker
          onChange={(val) => setEndDateTime(val)}
          value={endDateTime}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Street Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button type="submit" variant="primary" onClick={addPin}>
          Add Listing
        </Button>
        <Button
          type="button"
          variant="outline-secondary"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            clearNewPin();
          }}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default NewPinForm;
