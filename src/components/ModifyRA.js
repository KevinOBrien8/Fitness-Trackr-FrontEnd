import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { UseAuth } from "../custom-hooks";
import { Box, Typography, TextField, Button } from "@mui/material";

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
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography component="h1" variant="h5">
        Edit Routine
      </Typography>
      <TextField
        margin="normal"
        name="count"
        label="Count"
        type="text"
        id="count"
        value={form.count}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        name="duration"
        label="Duration"
        type="text"
        id="duration"
        value={form.duration}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit Changes
      </Button>
    </Box>
    // <form className="editCountForm" onSubmit={handleSubmit}>
    //   <h2>Modify Routine Activity</h2>
    //   <div className="routineActivityCount">
    //     <label>Count:</label>
    //     <input
    //       className="input"
    //       type="text"
    //       name="count"
    //       value={form.count}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className="routineActivityDuration">
    //     <label>Duration:</label>
    //     <input
    //       className="input"
    //       type="text"
    //       name="duration"
    //       value={form.duration}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <input className="submitBtn" type="submit" value="Submit Changes" />
    // </form>
  );
}
