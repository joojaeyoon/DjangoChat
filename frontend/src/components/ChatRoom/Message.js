import React from "react";

const Message = ({ state, message }) => {
  const renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now";
    } else if (timeDiff < 60 && timeDiff >= 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff >= 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff >= 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  return state ? (
    <div key={message.id} className="d-flex justify-content-end mb-4">
      <div className="msg_cotainer_send">
        {message.content}
        <div className="msg_time">{renderTimestamp(message.timestamp)}</div>
      </div>
      <div className="img_cont_msg"></div>
    </div>
  ) : (
    <div key={message.id} className="d-flex justify-content-start mb-4">
      <div className="img_cont_msg">
        <img
          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
          className="rounded-circle user_img_msg"
          alt="avatar"
        />
      </div>
      <div className="msg_cotainer">
        {message.content}
        <div className="msg_time">{renderTimestamp(message.timestamp)}</div>
      </div>
    </div>
  );
};

export default Message;
