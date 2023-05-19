import { useEffect, useState } from "react";
import oppService from "../../services/opps";
import TaskEdit from "../TaskEdit";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneIcon from "@mui/icons-material/Done";

import "./Timelines.css";
import { serializeDayJsDate } from "../../utils/serialize";

const serializeTimeline = (tasksArray) => {
  return tasksArray
    .map((task) => {
      return `${task.task} - ${serializeDayJsDate(task.date)}`;
    })
    .join("\n");
};

const ObjectiveCreator = (props) => {
  const inputStyle = {
    width: "40%",
    margin: "0px 20px 0px 0px",
  };

  const buttonStyle = {
    margin: "7px 20px",
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.addTask(props.opportunity.id);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="timeline-form">
        <TextField
          label="Follow up task"
          id="task"
          style={inputStyle}
          type="text"
          value={props.task}
          onChange={props.handleTask}
          required
        />

        <DatePicker
          id="date"
          label="Date"
          value={dayjs(props.date)}
          onChange={props.handleDate}
          disablePast
          format="MM-DD-YYYY"
        />
        <Button
          variant="contained"
          type="submit"
          className="submit-btn"
          style={buttonStyle}
        >
          add
        </Button>
      </form>
    </>
  );
};

const TimeLineList = ({ task, handleTaskDelete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);

  console.log(task)

  const timelineStyle = {
    fontWeight: "500",
    fontSize: "18px",
  };

  const button = {
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    minWidth: "0",
    backgroundColor: "grey",
  };

  const buttonColor = {
    ...button,
    backgroundColor: isCompleted ? "green" : "grey",
  };

  const handleComplete = (e) => {
    oppService.updateStatus({ ...task, completed: !isCompleted });
    setIsCompleted(!isCompleted);
  };


  return (
    <TableRow>
      <TableCell align="left" sx={{ width: 500 }}>
        <div style={timelineStyle}>
          <TaskEdit text={task.task} task={task} />
        </div>
      </TableCell>
      <TableCell align="left">
        <div style={timelineStyle}>
          {task.date.$M + 1}-{task.date.$D}-{task.date.$y}
        </div>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Button
          style={buttonColor}
          onClick={(e) => handleComplete(e)}
          value={isCompleted}
        >
          {isCompleted && <DoneIcon></DoneIcon>}
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={handleTaskDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

const TimeLine = (props) => {
  const nowDate = new Date();
  const DAY = nowDate.getDate();
  const MONTH = nowDate.getMonth() + 1;
  const YEAR = nowDate.getFullYear();

  const [opportunity, setOpportunity] = useState(props.opps[0]);
  const [tasks, setTasks] = useState([]);
  const [task, setNewTask] = useState("");
  const [date, setDate] = useState(dayjs(`${MONTH}-${DAY}-${YEAR}`));

  const handleTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const addTask = (id) => {
    const opp = props.opps.find((o) => o.id === id);

    const taskObj = {
      task: task,
      date: date,
      completed: false,
      opp: opp.id,
      id: task.id
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

  const setOpportunityHelper = (id) => {
    const opp = props.opps.find((o) => o.id === id);
    setOpportunity(opp);
  };

  const handleTaskDelete = (task, taskId, oppId) => {
    const opp = props.opps.find((o) => o.id === oppId);
    if (window.confirm(`Are you sure you want to delete the task "${task}"?`)) {
      oppService.removeTask(taskId).then(() => {
        opp.tasks = opp.tasks.filter(task => task.id !== taskId);
        setTasks(opp.tasks);
      })
    }
  }

  useEffect(() => {
    setOpportunityHelper(opportunity.id);
  }, [tasks]);

  const handleCopy = (event) => {
    navigator.clipboard.writeText(serializeTimeline(opportunity.tasks));
  };

  opportunity.tasks.sort((a, b) => a.date - b.date);

  return (
    <>
      <h1>Create your sales timeline</h1>
      <FormControl sx={{ mb: 5, minWidth: 300 }}>
        <InputLabel id="opportunities">Opportunity</InputLabel>

        <Select
          labelId="oppsId"
          id="opps"
          label="Opportunity"
          onChange={(event) => setOpportunityHelper(event.target.value)}
          value={opportunity.id}
        >
          {props.opps ? (
            props.opps.map((opp) => (
              <MenuItem key={opp.id} value={opp.id}>
                {opp.company}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Create Opportunity First</MenuItem>
          )}
        </Select>
      </FormControl>
      <ObjectiveCreator
        task={task}
        handleTask={handleTask}
        date={date}
        handleDate={handleDate}
        addTask={addTask}
        opportunity={opportunity}
      />
      {props.timeline === null && <h1>Fill out your timeline now!</h1>}
      {props.timeline !== null && (
        <TableContainer component={Paper} sx={{ mb: "200px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "20px", fontWeight: "900" }}>
                  Task:
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "900" }}
                  align="left"
                >
                  Date Due:
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleCopy}>
                    Copy Timeline to Clipboard
                  </Button>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "900" }}
                  align="left"
                >
                  Status:
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "900" }}
                  align="left"
                >
                  Delete:
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunity.tasks.map((task) => (
                <TimeLineList key={task.id} task={task} handleTaskDelete={() => handleTaskDelete(task.task, task.id, task.opp)}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TimeLine;
