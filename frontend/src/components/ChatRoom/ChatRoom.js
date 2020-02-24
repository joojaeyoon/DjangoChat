import React from "react";
import styled from "styled-components";

import Message from "./Message";

const ChatRoom = props => {
  const { handleSubmit, messages, username } = props;
  console.log(messages);

  const Messages = messages.map(message => {
    return (
      <Message
        key={message.id}
        state={message.author === username ? "sent" : "replies"}
        img={
          "https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
        }
        text={message.content}
      />
    );
  });

  return (
    <RoomDiv>
      <div className="infopanel">ID Panel</div>
      <div className="Messages">
        <ul>{Messages}</ul>
      </div>
      <div className="MessageForm">
        <ChatForm onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            autoComplete="off"
            placeholder="write text"
          />
          <input type="submit" value="Send" />
        </ChatForm>
      </div>
    </RoomDiv>
  );
};

const RoomDiv = styled.div`
  background-color: rgb(238, 238, 238);
  width: 80%;
  color: black;
  font-size: 18px;

  > .infopanel {
    top: 0;
    background-color: white;
    width: 100%;
    height: 10%;
    border-bottom: rgb(229, 229, 229) solid;
  }

  > .Messages {
    height: 90%;
    overflow-y: scroll;

    > ul {
      > .sent {
        text-align: right;
        margin-right: 30px;
        flex-direction: row-reverse;
      }

      > .replies {
        text-align: left;
        flex-direction: row;
        > div {
          background-color: rgb(67, 97, 122);
          color: white;
        }
      }

      > li {
        list-style: none;
        display: flex;

        > * {
          margin: 10px;
        }

        > div {
          background-color: white;
          border-radius: 10px;
          text-align: left;
          padding: 15px;
          color: rgb(67, 97, 122);
        }
      }
    }
  }

  > .MessageForm {
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 80%;
    height: 8%;
  }
`;

const ChatForm = styled.form`
  bottom: 0;
  > input[type="text"] {
    width: 90%;
    height: 40px;
  }

  > input[type="submit"] {
    width: 8%;
    height: 45px;
    border: none;
    background-color: #2ecc71;
    border-radius: 5px;
  }
`;

export default ChatRoom;
