import React, { useState } from "react";
import { Button, Form, Card, ButtonGroup } from "react-bootstrap";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import "./CustomToggleStyle.css";

import { LOOT_TYPES, SALE_TYPES } from "../constants";

const PinFilters = ({ filters, setFilters, reset, close }) => {
  const handleToggleChange = (type, group) => {
    let result = [...filters[group], type];
    if (filters[group].includes(type))
      result = filters[group].filter((t) => t !== type);
    setFilters({ ...filters, [group]: result });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          {SALE_TYPES.map((type) => {
            return (
              <Form.Label
                className="p-1 d-flex align-items-center"
                key={type.label}
              >
                <Toggle
                  className={type.label
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace("/", "-")}
                  checked={filters.saleTypes.includes(type.label)}
                  onChange={() => handleToggleChange(type.label, "saleTypes")}
                />
                <span className="ms-2">{type.label}</span>
              </Form.Label>
            );
          })}
          <hr />
          {LOOT_TYPES.map((type) => {
            return (
              <Form.Label
                className="p-1 d-flex align-items-center"
                key={type.label}
              >
                <Toggle
                  className={
                    "loot-type " +
                    type.label.toLowerCase().replace(" ", "-").replace("/", "-")
                  }
                  checked={filters.lootTypes.includes(type.label)}
                  onChange={() => handleToggleChange(type.label, "lootTypes")}
                />
                <span className="ms-2">{type.label}</span>
              </Form.Label>
            );
          })}
          <ButtonGroup className="w-100">
            <Button onClick={reset} variant="outline-secondary">
              Reset
            </Button>
            <Button onClick={close} variant="outline-secondary">
              Hide &darr;
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PinFilters;
