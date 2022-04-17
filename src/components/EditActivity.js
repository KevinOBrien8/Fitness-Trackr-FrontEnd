import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

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
        Edit Activity
      </Typography>
      <TextField
        margin="normal"
        name="name"
        label="Name"
        type="text"
        id="name"
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        name="description"
        label="Description"
        type="text"
        id="description"
        value={form.description}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit Changes
      </Button>
    </Box>
    // <form className="editActivityForm" onSubmit={handleSubmit}>
    //   <h2>Edit Activity</h2>
    //   <div className="activityName">
    //     <label>Name:</label>
    //     <input
    //       className="input"
    //       type="text"
    //       name="name"
    //       value={form.name}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <div className="activityDescription">
    //     <label>Description:</label>
    //     <input
    //       className="input"
    //       type="text"
    //       name="description"
    //       value={form.description}
    //       onChange={handleChange}
    //     />
    //   </div>
    //   <input className="submitBtn" type="submit" value="Submit Changes" />
    // </form>
  );
}
