import { Button, TextField, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../utils/style";
import "../App.css";
import { Link } from "react-router-dom";

const loginStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleUsername,
  handlePassword,
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
          <Button type="submit">Log In</Button>
        </form>
        <Button component={Link} to="createaccount" variant="contained" sx={{ mt: '10px', mr: '20px' }}>Create Account</Button>
        <Link>Forgot Password?</Link>
      </fieldset>
    </>
  );
};

export default Login;
