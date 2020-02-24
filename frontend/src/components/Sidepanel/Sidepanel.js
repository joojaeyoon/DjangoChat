import React from "react";
import styled from "styled-components";

const Sidepanel = props => {
  const { username, onClickFriend } = props;
  return (
    <SidePanelDiv>
      <div className="profile">
        <img
          src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
          alt=""
          style={{ width: "30px", height: "30px", borderRadius: "10px" }}
        />
        <span>{username}</span>
      </div>
      <div className="search">
        IMG <span>Search</span>
      </div>
      <div className="friends">
        <div
          onClick={e => {
            onClickFriend(e.target.textContent);
          }}
        >
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
          <span>jaeyoon</span>
        </div>
        <div
          onClick={e => {
            onClickFriend(e.target.textContent);
          }}
        >
          <img
            src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
            alt=""
            style={{ width: "30px", height: "30px", borderRadius: "10px" }}
          />
          <span>matt</span>
        </div>
      </div>
    </SidePanelDiv>
  );
};

const SidePanelDiv = styled.div`
  background-color: rgb(44, 62, 80);
  width: 20%;
  color: white;

  > .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15%;
    > * {
      margin: 15px;
    }
  }

  > .search {
    background-color: rgb(50, 70, 90);
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
    > * {
      margin-left: 30px;
    }
  }

  > .friends {
    height: 70%;
    background-color: rgb(44, 62, 80);
    > div {
      display: flex;
      cursor: pointer;
      > * {
        margin: 30px;
      }
      :hover {
        background-color: rgb(50, 70, 90);
      }
    }
  }
`;

export default Sidepanel;
