import React from "react";

const Message = ({ state, img, text }) => {
  return (
    <li className={state}>
      <img
        src={img}
        alt=""
        style={{ width: "30px", height: "30px", borderRadius: "10px" }}
      />
      <div>{text}</div>
    </li>
  );
};

export default Message;
