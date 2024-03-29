import React, { useState, useEffect } from "react";
import oppService from "./services/opps";
import loginService from "./services/login";
import Form from "./components/Form";
import Opportunities from "./components/routes/OpportunityRoute";
import TimeLine from "./components/routes/Timeline";
import CreateAccount from "./components/routes/CreateAccount";
import GamePlan from "./components/routes/GamePlan";
import ForgotPassword from "./components/routes/ForgotPassword";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkPallete, lightPallete } from "./palletes";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import PasswordReset from "./components/routes/PasswordReset";
config.autoAddCss = false;

function App() {
  let darkMode = JSON.parse(localStorage.getItem("theme"));

  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const handleDarkModeToggle = () => {
    localStorage.setItem("theme", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (darkMode === true) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [darkMode]);

  const theme = React.useMemo(() => {
    const pallete = isDarkMode ? darkPallete : lightPallete;
    return createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
        ...pallete,
      },
      typography: {
        button: {
          fontSize: 16,
          fontWeight: 700,
        },
      },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              color: pallete.outlined.contrastText,
              backgroundColor: pallete.outlined.main,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: "#fff",
              backgroundColor: pallete.primary.main,
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              backgroundColor: pallete.nav.main,
            },
          },
        },
      },
    });
  }, [isDarkMode]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedVSPappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      oppService.setToken(user.token);
    }
  }, []);

  const [opps, setOpps] = useState([]);

  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [businessIssue, setBusinessIssue] = useState("");
  const [anxietyQ, setAnxietyQ] = useState("");

  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [value, setValue] = useState("");

  const [plan, setPlan] = useState("");
  const [power, setPower] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    oppService.getAll().then((initialOpps) => {
      setOpps(initialOpps);
    });
  }, []);

  const handlePlan = (event) => {
    setPlan(event.target.value);
  };

  const handlePower = (event) => {
    setPower(event.target.value);
  };

  const handleProblem = (event) => {
    setProblem(event.target.value);
  };

  const handleSolution = (event) => {
    setSolution(event.target.value);
  };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleContact = (event) => {
    setContact(event.target.value);
  };

  const handleBusinessIssue = (event) => {
    setBusinessIssue(event.target.value);
  };

  const handleAnxietyQ = (event) => {
    setAnxietyQ(event.target.value);
  };

  const handleCompany = (event) => {
    setCompany(event.target.value);
  };

  const addOpp = (event) => {
    event.preventDefault();
    const oppObject = {
      company: company,
      contact: contact,
      businessIssue: businessIssue,
      anxietyQ: anxietyQ,
      problem: problem,
      solution: solution,
      value: value,
      power: power,
      plan: plan,
      gamePlan: "",
      status: "Open",
    };

    oppService.create(oppObject).then((returnedOpp) => {
      setOpps(
        opps.concat({
          ...returnedOpp,
          user: { id: user.id, username: user.username },
        })
      );
    });
    setNotificationType("success");
    setNotification("New opportunity created!");
    setNotificationOpen(true);
    setCompany("");
    setContact("");
    setBusinessIssue("");
    setAnxietyQ("");
    setProblem("");
    setSolution("");
    setValue("");
    setPlan("");
    setPower("");
  };

  const handleDelete = (company, id) => {
    if (
      window.confirm(
        `Are you sure you want to delete opportunity for "${company}"?`
      )
    ) {
      oppService.removeOpp(id).then(() => {
        setOpps(opps.filter((opp) => opp.id !== id));
      });
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedVSPappUser",
        JSON.stringify(loginUser)
      );

      setUser(loginUser);

      setUsername("");
      setPassword("");
      setNotificationType("success");
      setNotification("You are now logged in!");
      setNotificationOpen(true);
    } catch (exception) {
      setPassword("");
      setNotificationType("error");
      setNotification("Incorrect username or password");
      setNotificationOpen(true);
      console.log("wrong info", exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedVSPappUser");
    setUser(null);
  };

  const handleClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Nav
            handleDarkModeToggle={handleDarkModeToggle}
            isDarkMode={isDarkMode}
            user={user}
            handleLogout={handleLogout}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Form
                  addOpp={addOpp}
                  handleCompany={handleCompany}
                  company={company}
                  handleContact={handleContact}
                  contact={contact}
                  handleBusinessIssue={handleBusinessIssue}
                  businessIssue={businessIssue}
                  handleAnxietyQ={handleAnxietyQ}
                  anxietyQ={anxietyQ}
                  handleProblem={handleProblem}
                  problem={problem}
                  handleSolution={handleSolution}
                  solution={solution}
                  handleValue={handleValue}
                  value={value}
                  handlePlan={handlePlan}
                  plan={plan}
                  handlePower={handlePower}
                  power={power}
                  opps={opps}
                  setOpps={setOpps}
                  isDarkMode={isDarkMode}
                  handleDelete={handleDelete}
                  username={username}
                  setUsername={setUsername}
                  handleUsername={handleUsername}
                  password={password}
                  setPassword={setPassword}
                  handlePassword={handlePassword}
                  handleLogin={handleLogin}
                  user={user}
                  notification={notification}
                  notificationOpen={notificationOpen}
                  notificationType={notificationType}
                  setNotificationOpen={setNotificationOpen}
                  setNotificationType={setNotificationType}
                  handleClose={handleClose}
                />
              }
            />
            <Route
              path="/opportunities"
              element={
                <Opportunities
                  opps={opps}
                  setOpps={setOpps}
                  handleDelete={handleDelete}
                  user={user}
                  notification={notification}
                  notificationOpen={notificationOpen}
                  notificationType={notificationType}
                  handleClose={handleClose}
                  setNotification={setNotification}
                  setNotificationOpen={setNotificationOpen}
                  setNotificationType={setNotificationType}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                opps.length !== 0 && <TimeLine opps={opps} user={user} />
              }
            />
            <Route
              path="gameplan"
              element={
                opps.length !== 0 && (
                  <GamePlan user={user} opps={opps} setOpps={setOpps} />
                )
              }
            />
            <Route
              path="createaccount"
              element={
                <CreateAccount
                  user={user}
                  notification={notification}
                  notificationOpen={notificationOpen}
                  notificationType={notificationType}
                  setNotification={setNotification}
                  setNotificationOpen={setNotificationOpen}
                  setNotificationType={setNotificationType}
                  handleClose={handleClose}
                />
              }
            />
            <Route
              path="forgotpassword"
              element={<ForgotPassword user={user} />}
            />
            <Route
              path="password-reset/:id/:token"
              element={
                <PasswordReset
                  notification={notification}
                  notificationOpen={notificationOpen}
                  notificationType={notificationType}
                  setNotification={setNotification}
                  setNotificationOpen={setNotificationOpen}
                  setNotificationType={setNotificationType}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
