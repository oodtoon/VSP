import { Button, TextField, Box } from "@mui/material";
import { getCssPropertyValue } from "../utils/style";
import "../App.css";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const loginStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--primary-100"),
  borderRadius: "4px",
  boxShadow: "0 0 0 0",
};

const forgotPass = {
  fontSize: ".5em",
};

const demoUser = {
  fontSize: ".5em",
  fontStyle: "italic"
}

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


  return (
    <>
      <fieldset
        className="login-field"
        style={{
          ...loginStyle,
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
          sx={{ mt: "10px", mr: "20px", mb: "10px" }}
        >
          Create Account
        </Button>

        <Link to="/forgotpassword" style={forgotPass}>
          Forgot Password?
        </Link>
        <Box style={demoUser}>Demo account: <br />
        <span className="demo-login">L: DemoUser</span> P: EasyPassword</Box>
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
