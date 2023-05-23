import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import { getCssPropertyValue } from "../../utils/style";
import usersService from "../../services/users";
import "../../App.css";

const createStyle = {
  textAlign: "left",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const CreateAccount = (props) => {
  const theme = useTheme();

  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewUser = (event) => {
    setNewUser(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCreateAccount = (event) => {
    event.preventDefault();
    
    if (newPassword === confirmPassword) {
        const userObj = {
            username: newUser,
            password: newPassword
        }
    
        usersService.createUser(userObj)
        console.log('created')
    } else {
        console.log("passwords don't match")
    }
    setNewUser('')
    setNewPassword('')
    setConfirmPassword('')

  };

  return (
    <>
      {props.user === null && (
        <div>
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
                  onChange={handleNewUser}
                  value={newUser}
                  label="Username"
                />
              </label>
              <label>
                <TextField
                  size="small"
                  type="password"
                  placeholder="Password"
                  onChange={handleNewPassword}
                  value={newPassword}
                  className="login-form"
                  label="Password"
                />
              </label>

              <label>
                <TextField
                  size="small"
                  type="password"
                  placeholder="Re-enter Password"
                  className="login-form"
                  onChange={handleConfirmPassword}
                  value={confirmPassword}
                  label="Re-enter Password"
                />
              </label>
              <Button type="submit" variant="contained">
                Create Account
              </Button>
            </form>
          </fieldset>
        </div>
      )}
      {props.user !== null && (
        <div>{props.user.username} already logged in</div>
      )}
    </>
  );
};

export default CreateAccount;
