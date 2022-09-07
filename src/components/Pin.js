import React from "react";
import { Badge } from "react-bootstrap";
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
  isHovered,
  isActive,
}) => {
  // get color class based on sale type
  const color = SALE_TYPES.find((t) => t.label === saleType).color;
  const borderColor = isNewPin ? color : "white";
  let size = isNewPin || isHovered ? 30 : 20;
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
        height: size,
        borderRadius: isActive ? 10 : "50%",
        borderStyle: "solid",
        borderWidth: "2px",
        transform: "translate(-50%, -50%)",
        position: "relative",
        zIndex: -1,
        transition: "all 0.15s ease-out",
      }}
    >
      {isActive && (
        <div style={{ margin: 10 }}>
          <h5 className="text-white mb-0">{saleType}</h5>
          <p className="text-white mb-1">{dateText}</p>
          {lootTypes &&
            lootTypes.split(", ").map((t) => (
              <Badge bg="white" className="text-dark me-1">
                {t}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default Pin;
