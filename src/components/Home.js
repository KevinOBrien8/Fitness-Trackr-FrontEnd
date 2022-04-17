import { Typography } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <div className="homepage">
      <Typography
        variant="h1"
        align="center"
        paddingTop="200px"
        color="primary"
      >
        Welcome to Fitness Trackr!
      </Typography>
    </div>
  );
}
