import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./navbar.css";
export default function Navbar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Canvas
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  );
}
