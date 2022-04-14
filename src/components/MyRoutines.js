import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";
import { Link } from "react-router-dom";

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
        console.log(myRoutines);
        setUserRoutines(myRoutines);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMyRoutines();
  }, [me]);

  async function deleteRoutine({ id }) {
    try {
      const response = await fetch(`http://localhost:3000/api/routines/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const deletedRoutine = await response.json();

      setUserRoutines(
        userRoutines.filter((routine) => +routine.id !== +deletedRoutine.id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteRoutineActivity(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/routine_activities/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const deletedRoutineActivity = await response.json();

      setUserRoutines(
        userRoutines.map((routine) => {
          if (routine.id !== deletedRoutineActivity.routineId) {
            return routine;
          }

          routine.activities = routine.activities.filter(
            (activity) =>
              +activity.routineActivityId !== +deletedRoutineActivity.id
          );

          return routine;
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

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
      setUserRoutines([...userRoutines, newRoutine]);
      setForm({
        name: "",
        goal: "",
        isPublic: false,
      });
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
              {
                <Link
                  className="addActivityLink"
                  to={`/routines/${routine.id}/activities`}
                >
                  Add Activity
                </Link>
              }
              <button onClick={async (e) => await deleteRoutine(routine)}>
                Delete Routine
              </button>
              {activities &&
                activities.map((activity) => {
                  const { activityId, name, description, duration, count } =
                    activity;
                  return (
                    <div className="activitiesOnUserRoutine" key={activityId}>
                      <h4>{name}</h4>
                      <p>{description}</p>
                      <label>Duration:</label>
                      <span>{duration}</span>
                      <label>Count:</label>
                      <span>{count}</span>
                      <button
                        onClick={async (e) =>
                          await deleteRoutineActivity(
                            activity.routineActivityId
                          )
                        }
                      >
                        Remove Activity
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}
      <aside>
        <form className="newRoutineForm" onSubmit={handleSubmit}>
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
