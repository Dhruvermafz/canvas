import React from "react";
import Editor from "./Editor";
import "../styles.css";
import Container from "@mui/material/Container";
export default function Canvas() {
  return (
    <Container maxWidth="md">
      {" "}
      {/* Using Container component to wrap the Editor */}
      <div className="App">
        <Editor />
      </div>
    </Container>
  );
}
