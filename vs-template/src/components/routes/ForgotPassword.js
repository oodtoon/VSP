import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import resetService from "../../services/passwordReset";
import "../../App.css";
import { useState } from "react";

const resetStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  gridTemplateAreas: `"form demoUser"`,
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
  p: "2em",
};

const demoUser = {
  fontSize: "20px",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "white",
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const theme = useTheme();

  const handleUser = (event) => {
    setUser(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    const message = { user, email}
    await resetService.sendUserResetLink(message);

    setEmail("");
    setUser("");
  };

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
                  type="text"
                  placeholder="Username"
                  className="reset-form"
                  label="Username"
                  onChange={handleUser}
                  value={user}
                />
              </label>
              <label>
                <TextField
                  size="small"
                  type="text"
                  placeholder="E-mail"
                  className="reset-form"
                  label="E-mail"
                  onChange={handleEmail}
                  value={email}
                />
              </label>
              <Button variant="contained" type="submit">
                Send Password Reset Email
              </Button>
            </form>
          </Box>
          <Box sx={{ ...demoUser, gridArea: "demoUser" }}>
            Demo account: <br />
            Login: DemoUser
            <br />
            Password: EasyPassword
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ForgotPassword;
