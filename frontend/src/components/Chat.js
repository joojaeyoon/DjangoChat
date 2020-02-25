import React from "react";

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
    if (props.match.params.chatid !== undefined) {
      this.waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(
          this.setMessages.bind(this),
          this.addMessage.bind(this)
        );
        WebSocketInstance.fetchMessages(
          this.state.username,
          this.props.match.params.chatid
        );
      });

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

  ClickFriend = e => {
    console.log(e);
    //this.props.history.push(`/chat/${e}`);
  };

  SendMessage = e => {
    e.preventDefault();
    if (e.target.text.value === "") return;
    WebSocketInstance.newChatMessage({
      from: this.state.username,
      content: e.target.text.value
    });

    e.target.text.value = "";
  };

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          <Sidepanel
            username={this.stateusername}
            onClickFriend={this.ClickFriend}
          />
          <ChatRoom
            username={this.state.username}
            handleSubmit={this.SendMessage}
            messages={this.state.messages}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
