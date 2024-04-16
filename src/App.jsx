import React from "react";
import Canvas from "./components";
import { CssBaseline } from "@mui/material"; // Importing CssBaseline for baseline styles
import "./styles.css";

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline /> {/* Applying baseline styles from Material-UI */}
      <div className="App">
        <Canvas />
      </div>
    </React.Fragment>
  );
}
