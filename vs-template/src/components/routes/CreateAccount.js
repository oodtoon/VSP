import { Button, TextField, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style"
import "../../App.css";

const createStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const CreateAccount = () => {
const theme = useTheme()

  const handleCreateAccount = () => {
    console.log("account created");
  }
  
  return (
    <>
      <h1>Create Account</h1>
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
        <form onSubmit={handleCreateAccount}>
          <label>
              <TextField
                size="small"
                type="text"
                placeholder="Username"
                className="login-form"
                label="Username"
              />
          </label>
          <label>
              <TextField
                size="small"
                type="text"
                placeholder="Password"
                className="login-form"
                label="Password"
              />
          </label>

          <label>
              <TextField
                size="small"
                type="text"
                placeholder="Re-enter Password"
                className="login-form"
                label="Re-enter Password"
              />
          </label>
          <Button type="submit">Create Account</Button>
        </form>
      </fieldset>
    </>
  );
};

export default CreateAccount;
