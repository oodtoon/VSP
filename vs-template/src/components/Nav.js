import { AppBar, Switch, IconButton, Toolbar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  const vsName = () => (
    <div style={{ marginLeft: "20px" }}>Value Selling Form</div>
  );

  const loggedUser = () => (
    <div>
      Welcome {props.user.username}!
      <Button onClick={props.handleLogout} sx={{ ml: '10px' }}>Log Out</Button>
    </div>
  );
  return (
    <>
      <AppBar className="header">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>

          <nav>
            <NavLink to="/">Form</NavLink>
            <NavLink to="/opportunities">Current Opportunities</NavLink>
            <NavLink to="/tasks">Timeline</NavLink>
          </nav>

          <Switch
            sx={{ ml: "auto" }}
            onClick={props.handleDarkModeToggle}
            checked={props.isDarkMode}
          >
            Dark Mode
          </Switch>
          {props.user === null ? vsName() : loggedUser()}
        </Toolbar>
      </AppBar>

      <nav className="nav"></nav>
    </>
  );
};

export default Nav;
