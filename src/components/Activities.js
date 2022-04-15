import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UseAuth } from "../custom-hooks";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
} from "@mui/material";

export default function Activities() {
  const { isLoggedIn, token } = UseAuth();
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`http://localhost:3000/api/activities`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const activities = await response.json();

        setActivities(activities);
      } catch (err) {
        console.error(err);
      }
    }

    fetchActivities();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const newActivity = await response.json();

      if (newActivity.message) {
        window.alert(newActivity.message);
        return;
      }
      setActivities([...activities, newActivity]);
      setForm({
        name: "",
        description: "",
      });
    } catch (err) {
      window.alert(err);
      console.error(err);
    }
  }

  return (
    <Container>
      <Typography variant="h2" align="center" marginTop="40px">
        Public Activities
      </Typography>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {activities &&
            activities.map((activity) => {
              const { id, name, description } = activity;

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
                      <Typography>{description}</Typography>
                    </CardContent>
                    <CardActions>
                      {isLoggedIn && (
                        <Link
                          className="editActivityLink"
                          to={`/activities/${activity.id}`}
                        >
                          Edit Activity
                        </Link>
                      )}
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
            Create New Activity
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Activity"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            value={form.description}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit New Activity
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
