import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, TextField, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import usersService from "../../services/users";
import "../../App.css";
import Notification from "../Notification";
import { Container } from "@mui/material";

const createStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const CreateAccount = (props) => {
  const theme = useTheme();

  const [newUser, setNewUser] = useState("");

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNewUser, setIsNewUser] = useState(false);

  const handleNewUser = (event) => {
    setNewUser(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    if (newPassword === confirmPassword) {
      const userObj = {
        username: newUser,
        email: email,
        password: newPassword,
      };

      const response = await usersService.createUser(userObj);
      console.log(response)

      if (response.name === "ValidationError") {
        props.setNotificationOpen(true);
        props.setNotificationType("error");
        const type = response.message.includes("username") ? "Username" : "Email"
        props.setNotification(`${type} is already in use.`)
      } else {
        props.setNotificationOpen(true);
        props.setNotification("Account Created! Login to start using the app");
        props.setNotificationType("success");
      }

      setNewUser("");
      setNewPassword("");
      setConfirmPassword("");
      setIsNewUser(!isNewUser);
    } else {
      setNewPassword("");
      setConfirmPassword("");
      props.setNotificationOpen(true);
      props.setNotificationType("error");
      props.setNotification("Passwords don't match");
    }
  };

  if (isNewUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {props.user === null && (
        <div>
          <h1 className="create-header">Create Account</h1>

          <Container maxWidth="sm">
            <fieldset
              className="create-label"
              style={{
                ...createStyle,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? getCssPropertyValue("--primary-100")
                    : getCssPropertyValue("--secondary-200"),
              }}
            >
              <form onSubmit={handleCreateAccount} className="create-form">
                <TextField
                  size="small"
                  type="text"
                  placeholder="Username"
                  className="username"
                  onChange={handleNewUser}
                  value={newUser}
                  label="Username"
                />

                <TextField
                  size="small"
                  type="text"
                  placeholder="Email"
                  className="email"
                  onChange={handleEmail}
                  value={email}
                  label="Email"
                />

                <TextField
                  size="small"
                  type="password"
                  placeholder="Password"
                  onChange={handleNewPassword}
                  value={newPassword}
                  className="password"
                  label="Password"
                />

                <TextField
                  size="small"
                  type="password"
                  placeholder="Re-enter Password"
                  className="password2"
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  label="Re-enter Password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="create-btn"
                >
                  Create Account
                </Button>
              </form>
            </fieldset>
          </Container>
        </div>
      )}
      {props.user !== null && (
        <div>{props.user.username} already logged in</div>
      )}
      <Notification
        notification={props.notification}
        notificationOpen={props.notificationOpen}
        notificationType={props.notificationType}
        handleClose={props.handleClose}
      />
    </>
  );
};

export default CreateAccount;
