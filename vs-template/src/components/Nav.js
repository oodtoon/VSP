import { AppBar, Switch, IconButton, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";


const Nav = (props) => {
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
  
            <Switch sx={{ ml: "auto" }} onClick={props.handleDarkModeToggle} checked={props.isDarkMode}>
              Dark Mode
            </Switch>
            <div style={{ marginLeft: "20px" }}>Value Selling Form</div>
          </Toolbar>
        </AppBar>
  
        <nav className="nav"></nav>
      </>
    );
  };

  export default Nav