/** @format */

import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
function AccessDenied() {
  return (
    <div>
      <h1>User Access Denied</h1>
      <Link to="/home">Back to Home Page</Link>
    </div>
  );
}

export default AccessDenied;
