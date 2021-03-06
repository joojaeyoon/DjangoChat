import React, { useRef, useEffect } from "react";

import Message from "./Message";

const ChatRoom = props => {
  const { handleSubmit, messages, username, contact } = props;
  const bodyRef = useRef(null);

  const Messages = messages.map(message => {
    return (
      <Message
        key={message.id}
        state={message.author === username ? true : false}
        message={message}
      />
    );
  });

  useEffect(() => {
    if (bodyRef.current !== null) {
      bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
    }
  });

  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        <div className="card-header msg_head">
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img
                src="/static/default_icon.png"
                className="rounded-circle user_img"
                alt="avatar"
              />
              <span className="online_icon"></span>
            </div>
            <div className="user_info">
              <span>Chat with {contact.username}</span>
            </div>
          </div>
          {/* <span id="action_menu_btn">
            <i className="fas fa-ellipsis-v"></i>
          </span>
          <div className="action_menu">
            <ul>
              <li>
                <i className="fas fa-user-circle"></i> View profile
              </li>
              <li>
                <i className="fas fa-users"></i> Add to close friends
              </li>
              <li>
                <i className="fas fa-plus"></i> Add to group
              </li>
              <li>
                <i className="fas fa-ban"></i> Block
              </li>
            </ul>
          </div> */}
        </div>
        <div ref={bodyRef} className="card-body msg_card_body">
          {Messages}
        </div>
        <form className="card-footer" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text attach_btn">
                <i className="fas fa-paperclip"></i>
              </span>
            </div>
            <input
              name="text"
              className="form-control type_msg"
              placeholder="Type your message..."
              autoComplete="off"
            ></input>
            <div className="input-group-append">
              <button className="input-group-text send_btn">
                <i className="fas fa-location-arrow"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
