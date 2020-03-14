import React from "react";

export default () => {
  return (
    <div>
      <div
        className="spinner-border text-primary lg"
        style={{ width: "5em", height: "5em" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
