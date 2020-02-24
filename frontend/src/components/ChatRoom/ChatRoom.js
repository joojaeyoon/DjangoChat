import React from "react";
import styled from "styled-components";

const ChatRoom = props => {
  const { handleSubmit } = props;
  return (
    <RoomDiv>
      <div className="infopanel">ID Panel</div>
      <ul>
        <li className="sent">
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
          <div>
            TextTextTextTextTexTextText
            <br />
            TextTextTextTextTexTextTextTextTextTex
            <br />
            TextTextTextTextTexTextTextTextTextTex
          </div>
        </li>
        <li className="replies">
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
          <div>Text</div>
        </li>
        <li className="sent">
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
          <div>Text</div>
        </li>
      </ul>
      <ChatForm onSubmit={handleSubmit}>
        <div>
          <p>
            <input
              type="text"
              name="text"
              autoComplete="off"
              placeholder="write text"
            />
          </p>
          <p>
            <input type="submit" value="Send" />
          </p>
        </div>
      </ChatForm>
    </RoomDiv>
  );
};

const RoomDiv = styled.div`
  background-color: rgb(238, 238, 238);
  width: 70%;
  color: black;
  font-size: 18px;

  > .infopanel {
    background-color: white;
    height: 50px;
    border-bottom: rgb(229, 229, 229) solid;
  }

  > ul li {
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

  > ul .sent {
    text-align: right;
    margin-right: 30px;
    flex-direction: row-reverse;
  }

  > ul .replies {
    text-align: left;
    flex-direction: row;
    > div {
      background-color: rgb(67, 97, 122);
      color: white;
    }
  }
`;

const ChatForm = styled.form`
  bottom: 0;
  position: absolute;

  > div p {
    text-align: right;
  }

  > div p input[type="text"] {
    margin-left: 30px;
    width: 100vh;
    height: 40px;
  }

  > div p input[type="submit"] {
    width: 80px;
    height: 40px;
    border: none;
    background-color: #2ecc71;
    border-radius: 5px;
  }
`;

export default ChatRoom;
