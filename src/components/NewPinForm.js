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

  const handleTypeChange = (value) => {
    setSaleType(value);
  };

  const handleLootTypeChange = (value) => {
    setLootTypes(value);
  };

  const handleStartDateTimeChange = (value) => {
    console.log(typeof value);
    setStartDateTime(value);
  };
  const handleEndDateTimeChange = (value) => {
    setEndDateTime(value);
  };

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
        maxWidth: "320px",
        width: "320px",
        display: "flex",
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
          onChange={handleTypeChange}
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
          onChange={handleLootTypeChange}
          isMulti
          placeholder="What are you selling?"
          options={LOOT_TYPES.map(({ label }) => ({ label, value: label }))}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Starts at</Form.Label>
        <DateTimePicker
          onChange={handleStartDateTimeChange}
          value={startDateTime}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ends at</Form.Label>
        <DateTimePicker
          onChange={handleEndDateTimeChange}
          value={endDateTime}
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
