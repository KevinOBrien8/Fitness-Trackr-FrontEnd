import React, { useState, useEffect } from "react";

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
  TextField,
} from "@mui/material";

export default function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`http://localhost:3000/api/routines`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const routines = await response.json();
        setRoutines(routines);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRoutines();
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h3" marginTop="40px" align="center">
        Public Routines
      </Typography>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {routines &&
            routines.map((routine) => {
              const { id, name, goal, creatorName, activities } = routine;

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
                      <Typography>Creator: {creatorName}</Typography>
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
                                <Typography key={activityId} fontWeight="bold">
                                  {name}
                                </Typography>
                                <Typography>{description}</Typography>
                                <Typography>Count: {count}</Typography>
                                <Typography>Duration: {duration}</Typography>
                              </Grid>
                            );
                          })}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Container>
  );
}
{
  /* <div className="routines">
  <h1></h1>
  {routines &&
    routines.map((routine) => {
      const { id, name, goal, creatorName, activities } = routine;

      return (
        <div className="individualRoutine" key={id}>
          <h2>{name}</h2>
          <p>{goal}</p>
          <label>Creator:</label>
          <span>{creatorName}</span>
          {activities &&
            activities.map((activity) => {
              const { id, name, description, duration, count } = activity;

              return (
                <div className="activitiesOnRoutine" key={id}>
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
</div>; */
}
