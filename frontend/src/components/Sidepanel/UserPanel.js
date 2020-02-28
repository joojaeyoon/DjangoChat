import React, { useState, useRef } from "react";
import styled from "styled-components";

import Axios from "axios";

const UserPanel = props => {
  const { username, AddFriend } = props;
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);

  const SearchUser = () => {
    const username = inputRef.current.value;
    if (username === "") return;
    Axios.get(`/api/users/?search=${username}`).then(res => {
      setUsers(res.data);
    });
  };

  const Users = users.map(user => {
    if (user.username === username) return;
    return (
      <Li key={user.id}>
        {user.username}
        <span
          onClick={() => {
            AddFriend(user.username);
          }}
        >
          +
        </span>
      </Li>
    );
  });

  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              name=""
              className="form-control search"
              onKeyUp={e => {
                if (e.keyCode === 13) SearchUser();
              }}
            />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">
                <i className="fas fa-search" onClick={SearchUser}></i>
              </span>
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ul className="contacts" style={{ color: "white" }}>
            {Users.length === 0 ? <li>Find your friends!</li> : Users}
          </ul>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: bold;

  > span {
    cursor: pointer;
  }
`;

export default UserPanel;
