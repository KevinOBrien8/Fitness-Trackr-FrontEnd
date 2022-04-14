import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../custom-hooks";

import { useHistory } from "react-router-dom";

export default function EditRoutine() {
  const { token } = UseAuth();
  const { routineId } = useParams();
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/routines/${routineId}`,
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
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form className="editRoutineForm" onSubmit={handleSubmit}>
      <h2>Edit Routine</h2>
      <div className="activityName">
        <label>Name:</label>
        <input
          className="input"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="routineGoal">
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
      <input className="submitBtn" type="submit" value="Submit Changes" />
    </form>
  );
}
