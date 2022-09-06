import React, { useState } from "react";

import { getDatabase, set, push, ref } from "firebase/database";

import Select from "react-select";
import DateTimePicker from "react-datetime-picker";

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
    <form
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        transform: "translateX(-50%)",
        padding: 10,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
        borderRadius: 3,
      }}
      onSubmit={addPin}
    >
      <div style={{ marginBottom: 10 }}>
        <Select
          onChange={handleTypeChange}
          placeholder="Select A Type of Sale"
          options={SALE_TYPES.map(({ label }) => ({
            label,
            value: label,
          }))}
        />
      </div>
      <Select
        onChange={handleLootTypeChange}
        isMulti
        placeholder="What are you selling?"
        options={LOOT_TYPES.map(({ label }) => ({ label, value: label }))}
      />
      <div style={{ marginTop: 10 }}>
        <label>Starts at</label>
        <DateTimePicker
          onChange={handleStartDateTimeChange}
          value={startDateTime}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Ends at</label>
        <DateTimePicker
          onChange={handleEndDateTimeChange}
          value={endDateTime}
        />
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          style={{ flex: "1 0 auto", marginRight: 10 }}
          type="submit"
          value="Add Sale"
        />
        <button
          style={{
            width: 36,
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            clearNewPin();
          }}
        >
          &times;
        </button>
      </div>
    </form>
  );
};

export default NewPinForm;
