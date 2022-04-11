import React, { useState, useEffect } from "react";

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
    <div className="routines">
      <h1>Public Routines</h1>
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
    </div>
  );
}
