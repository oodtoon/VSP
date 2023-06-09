import { TextField, Button, useTheme, Box, Container } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import "../../App.css";

const resetStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  gridTemplateAreas: `"form demoUser"`,
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
  p: "2em"
};

const demoUser = {
  fontSize: "20px",
  fontWeight: "bold",
  fontStyle: "italic",
  color: "white",
};

const ForgotPassword = () => {
  const theme = useTheme();

  const handlePasswordReset = (event) => {
    event.preventDefault();
    console.log("password reset");
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
                  label="username"
                />
              </label>
              <label>
                <TextField
                  size="small"
                  type="text"
                  placeholder="E-mail"
                  className="reset-form"
                  label="E-mail"
                />
              </label>
              <Button variant="contained">Reset Password</Button>
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
