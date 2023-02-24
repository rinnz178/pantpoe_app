/** @format */

import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useAuthContext } from "./../context/AuthContext";
function AlertMessage({ type = "success", msg = "success message", alert }) {
  const { resetAlert } = useAuthContext();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      resetAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [resetAlert]);

  return (
    <Stack sx={{ width: "100%" }} mb={2}>
      <Alert
        severity={`${type}`}
        onClose={() => {
          resetAlert();
        }}
      >
        {msg}
      </Alert>
    </Stack>
  );
}

export default AlertMessage;
