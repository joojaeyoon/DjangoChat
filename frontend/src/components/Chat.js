import React from "react";

import Axios from "axios";

import Sidepanel from "./Sidepanel/Sidepanel";
import ChatRoom from "./ChatRoom/ChatRoom";
import UserPanel from "./Sidepanel/UserPanel";

import WebSocketInstance from "../websocket";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      friends: [{ username: "Public Chat", chatId: 1 }],
      selectedFriend: 0,
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      chatId: "1",
      avatar: null
    };
    if (this.state.token === null) props.history.push("/");

    if (this.state.chatId !== undefined) {
      this.waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(
          this.setMessages.bind(this),
          this.addMessage.bind(this)
        );

        WebSocketInstance.fetchMessages(this.state.chatId);
      });
    }

    WebSocketInstance.connect(this.state.chatId);

    Axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.state.token}`
    };

    this.getFriendlist();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chatId !== this.state.chatId) {
      this.setState({
        messages: [],
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
      });

      WebSocketInstance.socketRef.close();

      this.waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(
          this.setMessages.bind(this),
          this.addMessage.bind(this)
        );
        WebSocketInstance.fetchMessages(this.state.chatId);
      });

      WebSocketInstance.connect(this.state.chatId);
    }
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        // console.log("Connection is made");
        callback();
        return;
      } else {
        // console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  getFriendlist() {
    Axios.get(`/api/profiles/?username=${this.state.username}`).then(res => {
      const friends = res.data[0].chats.map((chat, idx) => {
        if (idx === 0) {
          WebSocketInstance.fetchMessages(chat.id);
          return { username: "Public Chat", chatId: chat.id };
        }
        const username = chat.participants.filter(
          p => p !== this.state.username
        )[0];

        return { username: username, chatId: chat.id };
      });

      this.setState({
        friends: [...friends],
        avatar: res.data[0].avatar
      });
    });
  }

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  ClickFriend = (order, chatId) => {
    if (chatId === this.state.chatId) return;

    this.setState({ selectedFriend: order, chatId: chatId });
  };

  AddFriend = username => {
    const { friends } = this.state;

    for (var i = 0; i < friends.length; i++) {
      if (friends[i].username === username) return;
    }

    Axios.post("/api/chat/", {
      participants: this.state.username + "," + username
    }).then(res => {
      WebSocketInstance.sendMessage({
        command: "new_chat",
        chatId: res.data.id
      });
      this.setState({
        friends: [...friends, { username: username, chatId: res.data.id }]
      });
    });
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
    const { username, friends, selectedFriend, avatar, messages } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row justify-content-center h-100">
          <UserPanel username={username} AddFriend={this.AddFriend} />
          <Sidepanel
            username={username}
            onClickFriend={this.ClickFriend}
            friends={friends}
            selectedFriend={selectedFriend}
            avatar={avatar}
          />
          <ChatRoom
            username={username}
            handleSubmit={this.SendMessage}
            messages={messages}
            contact={friends[selectedFriend]}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
