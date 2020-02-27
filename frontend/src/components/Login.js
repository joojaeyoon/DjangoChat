import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import styled, { keyframes } from "styled-components";

const LoginContainer = () => {
  const [loginForm, setLoginForm] = useState(true);
  const history = useHistory();

  if (localStorage.getItem("token") !== null) history.push("/chat");

  function onSubmit(e) {
    e.preventDefault();

    const form = e.target;

    if (loginForm) {
      const { username, password } = form;
      Axios.post("http://localhost:8000/rest-auth/login/", {
        username: username.value,
        password: password.value
      })
        .then(res => {
          const token = res.data.key;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username.value);
          history.push("/chat");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { username, email, password, password2 } = form;

      Axios.post("http://localhost:8000/rest-auth/registration/", {
        username: username.value,
        email: email.value,
        password1: password.value,
        password2: password2.value
      })
        .then(res => {
          const token = res.data.key;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username.value);
          history.push("/chat");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <LoginDiv>
      Login
      <LoginForm onSubmit={onSubmit}>
        {loginForm ? (
          <div>
            <p>
              <input
                type="text"
                autoComplete="off"
                name="username"
                placeholder="username"
              />
            </p>
            <p>
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="password"
              />
            </p>
          </div>
        ) : (
          <div>
            <p>
              <input
                type="text"
                autoComplete="off"
                name="username"
                placeholder="username"
              />
            </p>
            <p>
              <input
                type="email"
                autoComplete="off"
                name="email"
                placeholder="email"
              />
            </p>
            <p>
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="password"
              />
            </p>
            <p>
              <input
                type="password"
                autoComplete="off"
                name="password2"
                placeholder="password check"
              />
            </p>
          </div>
        )}
        <button>{loginForm ? "LOGIN" : "REGISTER"}</button>
      </LoginForm>
      <button
        onClick={() => {
          setLoginForm(!loginForm);
        }}
      >
        LOGIN / REGISTER
      </button>
    </LoginDiv>
  );
};

const slidein = keyframes`
  0%{
    transform:translateY(100%);
  }
  90%{
    transform:translateY(0%);
  }
`;

const extend = keyframes`
  0%{
    height:0px;
  }
  100%{

  }
`;

const LoginDiv = styled.div`
  font-size: 32px;
  font-weight: 400;
  color: #333333;
  display: inline-block;
  background-color: white;
  width: 400px;
  height: 550px;
  padding-top: 50px;
  border-radius: 5px;
  box-shadow: 10px 10px 10px 0px black;

  animation: ${slidein} 2s ease-out;

  > button,
  > form button {
    margin-top: 10px;
    width: 300px;
    height: 50px;
    font-size: 24px;
    font-weight: 300;
    color: white;
    border: none;
    border-radius: 20px;
    background: linear-gradient(
      90deg,
      rgba(220, 102, 255, 1) 0%,
      rgba(88, 147, 255, 1) 100%
    );
  }
`;

const LoginForm = styled.form`
  > div p input {
    width: 300px;
    height: 50px;
    font-size: 24px;
    background: #e5e5e5;
    border: none;
    border-radius: 3px;
    padding: 0px 10px;
    outline: none;
    animation: ${extend} 0.5s ease-out;

    :focus {
      background-color: #d5d5d5;
    }
  }
`;

export default LoginContainer;
