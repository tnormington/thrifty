import React from "react";
import { Badge, Button } from "react-bootstrap";
import { SALE_TYPES } from "../constants";

import dayjs from "dayjs";
import "./Pin.css";

const relativeTime = require("dayjs/plugin/relativeTime");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const calendar = require("dayjs/plugin/calendar");

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(calendar);

const Pin = ({
  saleType = "Garage/Yard Sale",
  startDateTime,
  endDateTime,
  lootTypes,
  isNewPin,
  isActive,
  $hover,
  closePin,
}) => {
  // get color class based on sale type
  const color = SALE_TYPES.find((t) => t.label === saleType).color;
  const borderColor = isNewPin ? color : "white";
  let size = isNewPin || $hover ? 30 : 20;
  if (isActive) size = "max-content";

  const start = startDateTime ? dayjs(startDateTime) : false;
  const end = endDateTime ? dayjs(endDateTime) : false;
  const now = dayjs();

  let dateText;

  if (start && now.isSameOrBefore(start)) {
    // before or day of event
    dateText = start.calendar(now);
  } else if (end && now.isSameOrBefore(end)) {
    dateText = `Ends ${end.calendar(now)}`;
  }

  return (
    <div
      className={`pin ${isNewPin ? "pin-pulse" : ""} bg-${
        !isNewPin ? color : "white"
      } border-${borderColor}`}
      style={{
        width: size,
        maxWidth: 420,
        height: size,
        borderRadius: isActive ? 10 : "50%",
        borderStyle: "solid",
        borderWidth: "2px",
        transform: "translate(-50%, -50%)",
        position: "relative",
        zIndex: isActive ? 5 : -1,
        transition: "all 0.15s ease-out",
        fontSize: 20,
        boxShadow: isActive ? "0 4px 20px rgba(0, 0, 0, 0.25)" : "none",
      }}
    >
      {isActive && (
        <div style={{ margin: 10 }}>
          <h3 className="text-white mb-0">{saleType}</h3>
          <p className="text-white mb-1">{dateText}</p>
          {lootTypes &&
            lootTypes.split(", ").map((t) => (
              <Badge key={t} bg="white" className="text-dark me-1 mb-1">
                {t}
              </Badge>
            ))}

          <div className="d-grid mt-2">
            <Button variant="outline-light" onClick={closePin}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pin;
