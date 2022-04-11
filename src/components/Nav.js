import React from "react";
import { UseAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/activities", name: "Activities" },
  { id: 3, to: "/routines", name: "All Routines" },
  { id: 4, to: "/me", name: "My Profile" },
];
const loggedOutLinks = [
  { id: 1, to: "/activities", name: "Activities" },
  { id: 2, to: "/routines", name: "All Routines" },
  { id: 3, to: "/login", name: "Login" },
  { id: 4, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = UseAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <nav>
      {navLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="navLink">
          {name}
        </NavLink>
      ))}
      {isLoggedIn && (
        <div className="logout" onClick={logout}>
          <i className="material-icons-outlined">logout</i>
          Logout
        </div>
      )}
    </nav>
  );
}
