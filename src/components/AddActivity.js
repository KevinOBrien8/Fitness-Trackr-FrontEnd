import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";

// import{Box, TextField, Menu} from "@mui/material"

export default function AddActivity() {
  const { routineId } = useParams();
  const history = useHistory();
  const [form, setForm] = useState({
    activityId: null,
    count: "",
    duration: "",
  });

  //   const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`http://localhost:3000/api/activities`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const activities = await response.json();

        setActivityList(activities);
      } catch (err) {
        console.error(err);
      }
    }

    fetchActivities();
  }, []);

  function handleChange(e) {
    if (e.target.name === "activity") {
      const activity = activityList.find((a) => a.name === e.target.value);
      return setForm({ ...form, activityId: activity.id });
    }

    setForm({ ...form, [e.target.name]: +e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/routines/${routineId}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (response.status === 200) {
        console.log(await response.json());
        history.push("/myroutines");
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(form);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="select-activity">Activity </label>
      <select name="activity" id="select-activity" onChange={handleChange}>
        <option>Choose An Activity</option>
        {activityList.map(({ name, id }) => {
          return <option key={id}>{name}</option>;
        })}
      </select>
      <label>Count:</label>
      <input
        className="input"
        type="text"
        name="count"
        value={form.count}
        onChange={handleChange}
      />
      <label>Duration:</label>
      <input
        className="input"
        type="text"
        name="duration"
        value={form.duration}
        onChange={handleChange}
      />
      <button id="submitActivity" onClick={handleSubmit}>
        Submit Activity
      </button>
    </form>
  );
}
