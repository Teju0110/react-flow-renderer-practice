import React from "react";
import { Handle } from "react-flow-renderer";

const Node = ({ data }) => {
  const { name, type } = data;

  console.log(data);

  return (
    <>
      <div>
        <strong>{name}</strong>
      </div>
      <div>Type: {type}</div>
      <div>
        <Handle type="source" position="right" style={{ backgroundColor: "#555" }} />
        <Handle type="target" position="left" style={{ backgroundColor: "#555" }} />
      </div>
    </>
  );
};

export default Node;



