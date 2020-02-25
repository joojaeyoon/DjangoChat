import React from "react";

import Axios from "axios";

import Sidepanel from "./Sidepanel/Sidepanel";
import ChatRoom from "./ChatRoom/ChatRoom";

import WebSocketInstance from "../websocket";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      friends: [],
      selectedFriend: 0,
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      chatId: props.match.params.chatid
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

    Axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.state.token}`
    };

    Axios.get(
      `http://localhost:8000/api/profiles/?username=${this.state.username}`
    ).then(res => {
      this.setState({ friends: res.data[0].friends });
    });
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
    this.setState({ messages: messages.reverse() });
  }

  ClickFriend = order => {
    console.log(order);
    this.setState({ selectedFriend: order });
    //this.props.history.push(`/chat/${e}`);
  };

  SendMessage = e => {
    e.preventDefault();
    if (e.target.text.value === "") return;
    WebSocketInstance.newChatMessage({
      from: this.state.username,
      content: e.target.text.value,
      chatId: this.state.chatId
    });

    e.target.text.value = "";
  };

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          <Sidepanel
            username={this.state.username}
            onClickFriend={this.ClickFriend}
            friends={this.state.friends}
            selectedFriend={this.state.selectedFriend}
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
