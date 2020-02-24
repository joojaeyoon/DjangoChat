import React from "react";
import styled from "styled-components";

import Sidepanel from "./Sidepanel/Sidepanel";
import ChatRoom from "./ChatRoom/ChatRoom";

import WebSocketInstance from "../websocket";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token")
    };

    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.match.params.chatID
      );
    });

    if (props.match.params.chatid !== undefined) {
      WebSocketInstance.connect(props.match.params.chatid);
    }
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ message: messages.reverse() });
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log(e.target.text.value);
    e.target.text.value = "";
  };

  ClickFriend = name => {
    this.props.history.push(`/chat/${name}`);
  };

  render() {
    return (
      <ChatDiv>
        <Sidepanel
          username={this.stateusername}
          onClickFriend={this.ClickFriend}
        />
        <ChatRoom handleSubmit={this.handleSubmit} />
      </ChatDiv>
    );
  }
}

const ChatDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default Chat;
