import React, { useState, useEffect } from "react";
import oppService from "./services/opps";
import Form from "./components/Form";
import Opportunities from "./components/routes/OpportunityRoute";
import TimeLine from "./components/routes/Timeline";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import { AppBar, Switch, Container, IconButton, Toolbar } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkPallete, lightPallete } from "./palletes";

import dayjs from "dayjs";

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

          <Switch sx={{ ml: "auto" }} onClick={props.handleDarkModeToggle}>
            Dark Mode
          </Switch>
          <div style={{ marginLeft: "20px" }}>Value Selling Form</div>
        </Toolbar>
      </AppBar>

      <nav className="nav"></nav>
    </>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const nowDate = new Date();
  const DAY = nowDate.getDate();
  const MONTH = nowDate.getMonth() + 1;
  const YEAR = nowDate.getFullYear();

  const [tasks, setTasks] = useState([]);
  const [task, setNewTask] = useState("");
  const [date, setDate] = useState(dayjs(`${MONTH}-${DAY}-${YEAR}`));

  useEffect(() => {
    oppService.getAll().then((initialOpps) => {
      console.log("initial", initialOpps);
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

  const handleTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleDate = (newDate) => {
    setDate(newDate);
    console.log(newDate.toString());
  };

  const addTask = (id) => {
    debugger;
    const opp = opps.find((o) => o.id === id);

    const taskObj = {
      task: task,
      date: date,
      completed: false,
      opp: opp.id,
    };

    oppService
      .createTask(taskObj)
      .then(() => {
        opp.tasks = opp.tasks.concat(taskObj);
        setTasks(opp.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
    setNewTask("");
    setDate(dayjs(`${MONTH}-${DAY}-${YEAR}`));
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Nav handleDarkModeToggle={handleDarkModeToggle} />
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
                    isDarkMode={isDarkMode}
                  />
                }
              />
              <Route
                path="/opportunities"
                element={<Opportunities opps={opps} />}
              />
              <Route
                path="/tasks"
                element={
                  opps.length !== 0 && (
                    <TimeLine
                      task={task}
                      handleTask={handleTask}
                      date={date}
                      handleDate={handleDate}
                      tasks={tasks}
                      addTask={addTask}
                      opps={opps}
                    />
                  )
                }
              />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
