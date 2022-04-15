import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

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
    console.log(form);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {loginOrRegister === "register"
            ? "Register New User"
            : "Welcome Back"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loginOrRegister === "register" ? "Sign Up" : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
