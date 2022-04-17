import React from "react";
import { UseAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";
import { AppBar, CssBaseline } from "@mui/material";
import { Logout } from "@mui/icons-material";

const loggedInLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/activities", name: "Activities" },
  { id: 3, to: "/routines", name: "All Routines" },
  { id: 4, to: "/myroutines", name: "My Routines" },
];
const loggedOutLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/activities", name: "Activities" },
  { id: 3, to: "/routines", name: "All Routines" },
  { id: 4, to: "/login", name: "Login" },
  { id: 5, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = UseAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" sx={{ height: "40px" }}>
        <nav>
          {navLinks.map(({ id, to, name }) => (
            <NavLink key={id} to={to} className="navLink">
              {name}
            </NavLink>
          ))}
          {isLoggedIn && <Logout className="logout" onClick={logout} />}
        </nav>
      </AppBar>
    </>
  );
}
// <div className="logout" onClick={logout}>
//   <i className="material-icons-outlined">logout</i>
//   Logout
// </div>
