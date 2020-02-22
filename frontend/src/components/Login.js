import React, { useState } from "react";
import Axios from "axios";

const LoginContainer = () => {
  const [loginForm, setLoginForm] = useState(true);
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
          // Success pro
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
          // Success pro
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {loginForm ? (
          <div>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
          </div>
        ) : (
          <div>
            <input type="text" name="username" placeholder="username" />
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <input type="password" name="password2" placeholder="password" />
          </div>
        )}
        <button>{loginForm ? "Login" : "Register"}</button>
      </form>
      <button
        onClick={() => {
          setLoginForm(!loginForm);
        }}
      >
        Login / Register
      </button>
    </div>
  );
};

export default LoginContainer;
