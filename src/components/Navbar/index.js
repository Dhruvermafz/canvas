import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Canvas Editor
        </Typography>
        {props.children}
      </Toolbar>
    </AppBar>
  );
}
