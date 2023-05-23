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

import { Container } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkPallete, lightPallete } from "./palletes";

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
    const loggedUserJSON = window.localStorage.getItem('loggedVSPappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      oppService.setToken(user.token)
    }
  }, [])

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
    };

    oppService.create(oppObject).then((returnedOpp) => {
      setOpps(opps.concat(returnedOpp));
    });
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
    console.log(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedVSPappUser", JSON.stringify(user));

      oppService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("logged in with", username);
    } catch (exception) {
      console.log("wrong info", exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedVSPappUser')
    setUser(null)
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
          <Container>
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
                    username={username}
                    setUsername={setUsername}
                    handleUsername={handleUsername}
                    password={password}
                    setPassword={setPassword}
                    handlePassword={handlePassword}
                    handleLogin={handleLogin}
                    user={user}
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
                  />
                }
              />
              <Route
                path="/tasks"
                element={opps.length !== 0 && <TimeLine opps={opps} user={user}/>}
              />
              <Route path="gameplan" element={<GamePlan user={user}/>} />
              <Route path="createaccount" element={<CreateAccount user={user}/>} />
              <Route path="forgotpassword" element={<ForgotPassword user={user}/>} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
