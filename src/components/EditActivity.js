import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";

export default function EditActivity() {
  const { activityId } = useParams();
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/activities/${activityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      if (response.status === 200) {
        console.log(await response.json());
        history.push("/activities");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form className="editActivityForm" onSubmit={handleSubmit}>
      <h2>Edit Activity</h2>
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
      <div className="activityDescription">
        <label>Description:</label>
        <input
          className="input"
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <input className="submitBtn" type="submit" value="Submit Changes" />
    </form>
  );
}
