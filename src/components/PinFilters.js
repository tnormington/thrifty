import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import "./CustomToggleStyle.css";

import { SALE_TYPES } from "../constants";

const PinFilters = ({ filters, setFilters, reset }) => {
  const handleToggleChange = (type) => {
    let saleTypes = [...filters.saleTypes, type];
    if (filters.saleTypes.includes(type))
      saleTypes = filters.saleTypes.filter((t) => t !== type);
    setFilters({ ...filters, saleTypes });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          {SALE_TYPES.map((type) => {
            return (
              <Form.Label
                className="d-flex align-items-center"
                key={type.label}
              >
                <Toggle
                  className={type.label
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace("/", "-")}
                  checked={filters.saleTypes.includes(type.label)}
                  onChange={() => handleToggleChange(type.label)}
                />
                <span className="ms-2">{type.label}</span>
              </Form.Label>
            );
          })}
          <div className="d-grid">
            <Button onClick={reset} variant="outline-secondary">
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PinFilters;
