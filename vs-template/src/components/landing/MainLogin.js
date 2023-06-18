import { Box, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import Login from "../Login";

import "../../App.css";

const header = {
  p: "0.5em 2em",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  fontWeight: 600,
  color: getCssPropertyValue("--primary-300"),
};

const login = {
  ...header,
  backgroundColor: getCssPropertyValue("--primary-100"),
  color: "white",
  gridArea: "login",
  p: ".5em",
};

const MainLogin = (props) => {
  return (
    <Container id="login" ref={props.scrollRef}>
      <div>
        <Box
          className="landing-container"
          sx={{
            ...header,
            m: "auto",
            mb: "5em",
          }}
        >
          <Box className="landing-header">
            <h1>More sales. Less stress. It's that simple.</h1>{" "}
          </Box>
          <Box className="landing-msg" sx={{ mb: "1em", pr: "1em" }}>
            Developed by the markets top performing sales people, our selling
            frame work is test and proven. You'll get more sales with less work.
            Give it a try!
          </Box>
          <Box className="landing-login" sx={{ ...login }}>
            <div className="login-action">Log in to sell more!</div>
            <Login
              username={props.username}
              setUsername={props.setUsername}
              password={props.password}
              setPassword={props.setPassword}
              handleLogin={props.handleLogin}
              handleUsername={props.handleUsername}
              handlePassword={props.handlePassword}
              notification={props.notification}
              notificationOpen={props.notificationOpen}
              notificationType={props.notificationType}
            />
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default MainLogin;
