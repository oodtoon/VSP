import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  useTheme,
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
import Grow from "@mui/material/Grow";

import "./Timelines.css";

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
      <form onSubmit={submitHandler} className="form">
        <TextField
          label="Follow up task"
          id="task"
          style={inputStyle}
          type="text"
          value={props.task}
          onChange={props.handleTask}
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

const TimeLineList = ({ task }) => {
  const timelineStyle = {
    fontWeight: "500",
    fontSize: "18px",
  };

  const button = {
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    minWidth: "0",
    backgroundColor: "green",
  };
  return (
    <TableRow>
      <TableCell align="left" sx={{ width: 500 }}>
        <div style={timelineStyle}>{task.task}</div>
      </TableCell>
      <TableCell align="left">
        <div style={timelineStyle}>
          {task.date.$M + 1}-{task.date.$D}-{task.date.$y}
        </div>
      </TableCell>
      <TableCell>
        <Button style={button}>
          <DoneIcon></DoneIcon>
        </Button>
      </TableCell>
    </TableRow>
  );
};

const TimeLine = (props) => {
  const [opportunity, setOpportunity] = useState(props.opps[0]);
  console.log(opportunity);

  useEffect(() => {
    setOpportunityHelper(opportunity.id);
  }, [props.tasks]);

  const setOpportunityHelper = (id) => {
    const opp = props.opps.find((o) => o.id === id);
    setOpportunity(opp);
  };

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
        task={props.task}
        handleTask={props.handleTask}
        date={props.date}
        handleDate={props.handleDate}
        addTask={props.addTask}
        opportunity={opportunity}
      />
      {props.timeline === null && <h1>Fill out your timeline now!</h1>}
      {props.timeline !== null && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "20px", fontWeight: "900" }}>
                  Task
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "900" }}
                  align="left"
                >
                  Date Due:
                </TableCell>
                <TableCell
                  sx={{ fontSize: "20px", fontWeight: "900" }}
                  align="left"
                >
                  Status:
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunity.tasks.map((task) => (
                <TimeLineList key={task.id} task={task} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TimeLine;
