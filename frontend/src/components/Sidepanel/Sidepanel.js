import React from "react";
import styled from "styled-components";

const Sidepanel = props => {
  const { username, onClickFriend, friends, selectedFriend, avatar } = props;

  const FriendList = friends.map((friend, idx) => {
    return (
      <Li
        key={idx}
        onClick={() => {
          onClickFriend(idx);
        }}
        className={idx === selectedFriend ? "active" : ""}
      >
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              className="rounded-circle user_img"
              alt="avatar"
            />
            <span className="online_icon"></span>
          </div>
          <div className="user_info">
            <span name="name">{friend}</span>
            <p>{friend} is online</p>
          </div>
        </div>
      </Li>
    );
  });

  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <ProfileDiv className="d-flex bd-highlight">
          <div className="img_cont">
            <label htmlFor="file-input">
              <img
                src={
                  avatar
                    ? avatar
                    : "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                }
                alt="avatar"
                className="rounded-circle user_img"
              />
            </label>
            <input
              id="file-input"
              type="file"
              onChange={e => {
                console.log(e.target.value);
              }}
            />
            <span className="online_icon"></span>
          </div>
          <div className="user_info">
            <span name="name">{username}</span>
          </div>
        </ProfileDiv>
        {/* <div className="card-header">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              name=""
              className="form-control search"
            />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div> */}
        <div className="card-body contacts_body">
          <ul className="contacts">{FriendList}</ul>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

const Li = styled.li`
  cursor: pointer;

  > * {
    pointer-events: none;
  }

  > div .user_info {
    text-align: left;
  }
`;

const ProfileDiv = styled.div`
  > div label {
    cursor: pointer;
  }
  > div input[type="file"] {
    display: none;
  }
`;

export default Sidepanel;
