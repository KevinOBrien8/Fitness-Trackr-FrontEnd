import React, { useState, useEffect } from "react";
import { UseAuth } from "../custom-hooks";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  Checkbox,
  TextField,
  FormControlLabel,
} from "@mui/material";

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
    <Container>
      <CssBaseline />
      <Typography variant="h3" color="inherit" align="center" noWrap>
        Hi {me.username}
      </Typography>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h4"
          marginTop="40px"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Routines
        </Typography>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {userRoutines &&
            userRoutines.map((routine) => {
              const { id, name, goal, activities } = routine;

              return (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {name}
                      </Typography>
                      <Typography>{goal}</Typography>
                      <Grid>
                        {activities &&
                          activities.map((activity) => {
                            const {
                              activityId,
                              name,
                              description,
                              duration,
                              count,
                            } = activity;
                            return (
                              <Grid>
                                <Typography key={activityId}>{name}</Typography>
                                <Typography>{description}</Typography>
                                <Typography>Count: {count}</Typography>
                                <Typography>Duration: {duration}</Typography>
                                {
                                  <Link
                                    className="modifyActivityLink"
                                    to={`/routine_activities/${activity.routineActivityId}`}
                                  >
                                    Modify Activity
                                  </Link>
                                }
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  sx={{ mt: 3, mb: 2 }}
                                  onClick={async (e) =>
                                    await deleteRoutineActivity(
                                      activity.routineActivityId
                                    )
                                  }
                                >
                                  Remove Activity
                                </Button>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Link
                        className="editRoutineLink"
                        to={`/routines/${routine.id}`}
                      >
                        Edit Routine
                      </Link>
                      <Link
                        size="small"
                        className="addActivityLink"
                        to={`/routines/${routine.id}/activities`}
                      >
                        Add Activity
                      </Link>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={async (e) => await deleteRoutine(routine)}
                      >
                        Delete Routine
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
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
            Create New Routine
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Routine Name"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="goal"
            label="Goal"
            type="text"
            id="goal"
            value={form.goal}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isPublic"
                checked={form.isPublic}
                onChange={handleChange}
              />
            }
            label="Make this Public"
          />

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit New Routine
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
// {/* <aside>
//         <form className="newRoutineForm" onSubmit={handleSubmit}>
//           <h3>Create New Routine</h3>
//           <div className="routineName">
//             <label>Name:</label>
//             <input
//               className="input"
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="goal">
//             <label>Goal:</label>
//             <input
//               className="input"
//               type="text"
//               name="goal"
//               value={form.goal}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="isPublic">
//             <label>Make this public?</label>
//             <input
//               className="publicCheckbox"
//               type="checkbox"
//               name="isPublic"
//               checked={form.isPublic}
//               onChange={handleChange}
//             />
//       //     </div>  <input
//       //       className="submitBtn"
//       //       type="submit"
//       //       value="Submit New Routine"
//       //     />
//       //   </form>
//       // </aside>
