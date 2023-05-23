import { TextField, Button, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import "../../App.css";

const resetStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const ForgotPassword = () => {
  const theme = useTheme();

  const handlePasswordReset = (event) => {
    event.preventDefault();
    console.log("password reset");
  };

  return (
    <>
      <fieldset
        className="create-label"
        style={{
          ...resetStyle,
          backgroundColor:
            theme.palette.mode === "dark"
              ? getCssPropertyValue("--primary-100")
              : getCssPropertyValue("--secondary-200"),
        }}
      >
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
      </fieldset>
    </>
  );
};

export default ForgotPassword;
