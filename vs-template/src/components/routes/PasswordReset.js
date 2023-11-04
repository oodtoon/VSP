import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, TextField, useTheme, Box, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import resetService from "../../services/passwordReset";

import "../../App.css";

import Notification from "../Notification";

const resetStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  gridTemplateAreas: `"form demoUser"`,
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
  p: "2em",
};

const PasswordReset = (props) => {
  const theme = useTheme();
  const param = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    const url = `http://localhost:3001/api/password-reset/${param.id}/${param.token}`;

    if (newPassword === confirmPassword) {
      const response = await resetService.updateUserPassword(url, {
        newPassword,
      });
      const { data, status } = response;
      props.setNotificationOpen(true);
      if (status === 200) {
        props.setNotificationType("success");
        setIsPasswordReset(true)
      } else {
        props.setNotificationType("error");
      }
      props.setNotification(data.message);
    } else {
      props.setNotificationOpen(true);
      props.setNotificationType("error");
      props.setNotification("Passwords don't match");
    }

    setNewPassword("");
    setConfirmPassword("");
  };

  if (isPasswordReset) {
    return <Navigate to="/"/>
  }

  return (
    <div>
      <Container>
        <Box
          sx={{
            ...resetStyle,
            backgroundColor:
              theme.palette.mode === "dark"
                ? getCssPropertyValue("--primary-100")
                : getCssPropertyValue("--secondary-200"),
          }}
        >
          <Box sx={{ gridArea: "form" }}>
            <form onSubmit={handlePasswordReset}>
              <label>
                <TextField
                  size="small"
                  type="password"
                  placeholder="New Password"
                  className="reset-form"
                  label="New Password"
                  onChange={handleNewPassword}
                  value={newPassword}
                />
              </label>
              <label>
                <TextField
                  size="small"
                  type="password"
                  placeholder="Confirm Password"
                  className="reset-form"
                  label="Confirm Password"
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                />
              </label>
              <Button variant="contained" type="submit">
                Reset Password
              </Button>
            </form>
          </Box>
        </Box>
        <Notification
          notification={props.notification}
          notificationOpen={props.notificationOpen}
          notificationType={props.notificationType}
          handleClose={props.handleClose}
        />
      </Container>
    </div>
  );
};

export default PasswordReset;
