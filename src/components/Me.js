import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";

export default function Me() {
  const { token } = UseAuth();

  const [username, setUsername] = useState("");
  const [userRoutinese, setUserRoutines] = useState([]);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const me = await response.json();
        setUsername(me.username);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMe();
  }, [token]);

  return <div>Hi {username}</div>;
}
