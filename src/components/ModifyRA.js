import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

import { useHistory } from "react-router-dom";

export default function EditRoutine() {
  const { token } = UseAuth();
  const { activityId } = useParams();
  const history = useHistory();

  const [form, setForm] = useState({
    count: "",
    duration: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/routine_activities/${activityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form className="editCountForm" onSubmit={handleSubmit}>
      <h2>Modify Routine Activity</h2>
      <div className="routineActivityCount">
        <label>Count:</label>
        <input
          className="input"
          type="text"
          name="count"
          value={form.count}
          onChange={handleChange}
        />
      </div>
      <div className="routineActivityDuration">
        <label>Duration:</label>
        <input
          className="input"
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
        />
      </div>
      <input className="submitBtn" type="submit" value="Submit Changes" />
    </form>
  );
}
