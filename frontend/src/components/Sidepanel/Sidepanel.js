import React from "react";
import styled from "styled-components";

const Sidepanel = props => {
  const { username, onClickFriend, friends, selectedFriend } = props;

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
        <div>{username}</div>
        <div className="card-header">
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
        </div>
        <div className="card-body contacts_body">
          <ul className="contacts">
            {FriendList}
            <li className="active">
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
                  <span name="name">Khalid</span>
                  <p>Kalid is online</p>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                    className="rounded-circle user_img"
                    alt="avatar"
                  />
                  <span className="online_icon offline"></span>
                </div>
                <div className="user_info">
                  <span>Taherah Big</span>
                  <p>Taherah left 7 mins ago</p>
                </div>
              </div>
            </li>
          </ul>
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
`;

export default Sidepanel;
