import React from "react";
import { Typography, Link } from "@mui/material";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Typography>
        Created with ❤️ by &nbsp;
        <Link className="website-link" href="https://dhruvermafz.vercel.app/">
          Dhruv Verma
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
