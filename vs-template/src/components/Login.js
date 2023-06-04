import { Button, TextField, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../utils/style";
import "../App.css";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const loginStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
  boxShadow: "0 0 0 0",
};

const Login = ({
  username,
  password,
  handleLogin,
  handleUsername,
  handlePassword,
  notification,
  notificationOpen,
  notificationType,
  
}) => {
  const theme = useTheme();


  return (
    <>
      <fieldset
        className="login-field"
        style={{
          ...loginStyle,
          backgroundColor:
            theme.palette.mode === "dark"
              ? getCssPropertyValue("--primary-100")
              : getCssPropertyValue("--secondary-200"),
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 0px 60px 10px var(--primary-300)"
              : "0 0 0 0",
        }}
      >
        <form action="submit" onSubmit={handleLogin}>
          <label className="login-label">
            <TextField
              size="small"
              type="text"
              placeholder="Username"
              className="login-form"
              onChange={handleUsername}
              value={username}
              label="username"
            />
          </label>
          <label className="login-label">
            <TextField
              size="small"
              type="password"
              placeholder="Password"
              className="login-form"
              onChange={handlePassword}
              value={password}
              label="password"
            />
          </label>

          <Button type="submit" variant="contained">
            Log In
          </Button>
        </form>
        <Button
          component={Link}
          to="createaccount"
          variant="contained"
          sx={{ mt: "10px", mr: "20px" }}
        >
          Create Account
        </Button>
        <Link to="/forgotpassword">Forgot Password?</Link>
      </fieldset>
      <Notification
        notification={notification}
        severity={notificationType}
        notificationOpen={notificationOpen}
        notificationType={notificationType}
      />
    </>
  );
};

export default Login;
