import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";

export default function MyRoutines() {
  const { token } = UseAuth();

  const [me, setMe] = useState({});
  const [userRoutines, setUserRoutines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });

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
        setMe(me);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMe();
  }, [token]);

  useEffect(() => {
    async function fetchMyRoutines() {
      try {
        const { username } = me;
        const response = await fetch(
          `http://localhost:3000/api/users/${username}/routines`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const myRoutines = await response.json();
        setUserRoutines(myRoutines);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMyRoutines();
  }, [me]);

  function handleChange(e) {
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/routines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const newRoutine = await response.json();
      console.log(newRoutine);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      Hi {me.username}
      {userRoutines &&
        userRoutines.map((routine) => {
          const { id, name, goal, activities } = routine;

          return (
            <div className="userRoutine" key={id}>
              <h2>{name}</h2>
              <p>{goal}</p>
              {activities &&
                activities.map((activity) => {
                  const { id, name, description, duration, count } = activity;

                  return (
                    <div className="activitiesOnUserRoutine" key={id}>
                      <h4>{name}</h4>
                      <p>{description}</p>
                      <label>Duration:</label>
                      <span>{duration}</span>
                      <label>Count:</label>
                      <span>{count}</span>
                    </div>
                  );
                })}
            </div>
          );
        })}
      <aside>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <h3>Create New Routine</h3>
          <div className="routineName">
            <label>Name:</label>
            <input
              className="input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="goal">
            <label>Goal:</label>
            <input
              className="input"
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleChange}
            />
          </div>
          <div className="isPublic">
            <label>Make this public?</label>
            <input
              className="publicCheckbox"
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />
          </div>
          <input
            className="submitBtn"
            type="submit"
            value="Submit New Routine"
          />
        </form>
      </aside>
    </div>
  );
}
