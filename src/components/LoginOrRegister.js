import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

export default function LoginOrRegister() {
  const { updateAuthStatus } = UseAuth();
  const { pathname } = useLocation();
  const loginOrRegister = pathname.slice(1);
  const history = useHistory();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${loginOrRegister}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      console.log(response.status);
      const me = await response.json();
      if (response.status === 200) {
        localStorage.st_token = me.token;
        updateAuthStatus();
        history.push("/myroutines");
        window.alert(me.message);
      } else {
        window.alert("Unrecognized username/password");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>
        {loginOrRegister === "register" ? "Register New User" : "Welcome Back"}
      </h1>
      <div className="userName">
        <label>{loginOrRegister === "register" && "Choose "}Username:</label>
        <input
          className="input"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
      </div>
      <div className="password">
        <label>{loginOrRegister === "register" && "Choose "}Password:</label>
        <input
          className="input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        className="loginBtn"
        type="submit"
        value={loginOrRegister === "register" ? "Sign Up" : "Login"}
      />
    </form>
  );
}
