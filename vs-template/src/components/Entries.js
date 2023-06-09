import { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import ToggleCopy from "./ToggleCopy";
import InLineEdit from "./InLineEdit";
import StatusSelect from "./StatusSelect";
import { getCssPropertyValue } from "../utils/style";
import "../App.css";


const EntryInfo = ({
  opp,
  handleDelete,
  notification,
  notificationOpen,
  notificationType,
  handleClose,
  setNotification,
  setNotificationOpen,
  setNotificationType,
}) => {
  const formatter = () => {
    const oppFirstHalf = [];
    const oppSecondHalf = [];

    if (
      (opp.company !== "" &&
        JSON.parse(localStorage.getItem("company")) === true) ||
      (localStorage.getItem("company") === null && opp.company !== "")
    ) {
      oppFirstHalf.push("Company: " + opp.company);
    }

    if (
      (opp.contact !== "" &&
        JSON.parse(localStorage.getItem("contact")) === true) ||
      (localStorage.getItem("contact") === null && opp.contact !== "")
    ) {
      oppFirstHalf.push("Contact: " + opp.contact);
    }

    if (
      (opp.businessIssue !== "" &&
        JSON.parse(localStorage.getItem("businessIssue")) === true) ||
      (localStorage.getItem("businessISsue") === null &&
        opp.businessIssue !== "")
    ) {
      oppFirstHalf.push("Business Issue: " + opp.businessIssue);
    }

    if (
      (opp.anxietyQ !== "" &&
        JSON.parse(localStorage.getItem("anxietyQ")) === true) ||
      (localStorage.getItem("anxietyQ") === null && opp.anxiety !== "")
    ) {
      oppFirstHalf.push("Anxiety Question: " + opp.anxietyQ);
    }

    if (
      (opp.problem !== "" &&
        JSON.parse(localStorage.getItem("problem")) === true) ||
      (localStorage.getItem("problem") === null && opp.problem !== "")
    ) {
      oppSecondHalf.push("Problem: " + opp.problem);
    }

    if (
      (opp.solution !== "" &&
        JSON.parse(localStorage.getItem("solution")) === true) ||
      (localStorage.getItem("solution") === null && opp.solution !== "")
    ) {
      oppSecondHalf.push("Solution: " + opp.solution);
    }

    if (
      (opp.value !== "" &&
        JSON.parse(localStorage.getItem("value")) === true) ||
      (localStorage.getItem("value") === null && opp.value !== "")
    ) {
      oppSecondHalf.push("Value: " + opp.value);
    }

    if (
      (opp.power !== "" &&
        JSON.parse(localStorage.getItem("power")) === true) ||
      (localStorage.getItem("power") === null && opp.power !== "")
    ) {
      oppSecondHalf.push("Power: " + opp.power);
    }

    if (
      (opp.plan !== "" && JSON.parse(localStorage.getItem("plan")) === true) ||
      (localStorage.getItem("plan") === null && opp.plan !== "")
    ) {
      oppSecondHalf.push("Plan: " + opp.plan);
    }

    if (oppSecondHalf.length !== 0) {
      oppFirstHalf.push("");
      return oppFirstHalf.concat(oppSecondHalf).join("\n");
    } else {
      return oppFirstHalf.join("\n");
    }
  };

  const handleCopy = (event) => {
    navigator.clipboard.writeText(formatter());
  };

  const theme = useTheme();

  const oppBox = {
    mt: "1em",
    border: "solid 2px",
    borderColor:
      theme.palette.mode === "dark"
        ? getCssPropertyValue("--secondary-100")
        : getCssPropertyValue("--primary-300"),
    mb: ".2em",
    pl: "1em",
    pb: "2em",
    borderRadius: "8px",
    boxShadow: "0 0 1em rgba(0, 0, 0, 0.5)",
    backgroundColor: theme.palette.mode === "dark" ? "rgb(30, 30, 30)" : "#FFF",
    
  };

  return (
    <div>
      <Box sx={{ ...oppBox }}>
        <div>
          <fieldset className="entry-details">
            <div className="entry-line">
              <ToggleCopy keyToEdit={"company"} />
              <label className="display-label">
                Company:{" "}
                <InLineEdit
                  text={opp.company}
                  keyToEdit={"company"}
                  obj={opp}
                />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"contact"} />
              <label className="display-label">
                Contact:{" "}
                <InLineEdit
                  text={opp.contact}
                  keyToEdit={"contact"}
                  obj={opp}
                />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"businessIssue"} />
              <label className="display-label">
                Business Issue:
                <InLineEdit
                  text={opp.businessIssue}
                  keyToEdit={"businessIssue"}
                  obj={opp}
                />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"anxietyQ"} />
              <label className="display-label">
                Anxiety Question:{" "}
                <InLineEdit
                  text={opp.anxietyQ}
                  keyToEdit={"anxietyQ"}
                  obj={opp}
                />
              </label>
            </div>
            <br />
            <div className="entry-line">
              <ToggleCopy keyToEdit={"problem"} />
              <label className="display-label">
                Problem:{" "}
                <InLineEdit
                  text={opp.problem}
                  keyToEdit={"problem"}
                  obj={opp}
                />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"solution"} />
              <label className="display-label">
                Solution:{" "}
                <InLineEdit
                  text={opp.solution}
                  keyToEdit={"solution"}
                  obj={opp}
                />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"value"} />
              <label className="display-label">
                Value:{" "}
                <InLineEdit text={opp.value} keyToEdit={"value"} obj={opp} />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"power"} />
              <label className="display-label">
                Power:{" "}
                <InLineEdit text={opp.power} keyToEdit={"power"} obj={opp} />
              </label>
            </div>
            <div className="entry-line">
              <ToggleCopy keyToEdit={"plan"} />
              <label className="display-label">
                Plan:{" "}
                <InLineEdit text={opp.plan} keyToEdit={"plan"} obj={opp} />
              </label>
            </div>
          </fieldset>
          <StatusSelect
            oppStatus={opp.status}
            opp={opp}
            notification={notification}
            notificationOpen={notificationOpen}
            notificationType={notificationType}
            handleClose={handleClose}
            setNotification={setNotification}
            setNotificationOpen={setNotificationOpen}
            setNotificationType={setNotificationType}
          />
        </div>
      </Box>
      <Button
        variant="contained"
        onClick={handleCopy}
        sx={{ mt: "30px", mb: "50px" }}
      >
        Copy Opportunity to Clipboard
      </Button>
      <Button
        variant="contained"
        onClick={handleDelete}
        sx={{ mt: "30px", mb: "50px", ml: "25px" }}
      >
        Delete
      </Button>
    </div>
  );
};

const Entries = ({
  opp,
  handleDelete,
  notification,
  notificationOpen,
  notificationType,
  handleClose,
  setNotification,
  setNotificationOpen,
  setNotificationType,
}) => {
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();

  const btnTheme = {
  fontSize: 25,
  fontWeight: 900,
  textAlign: 'left',
  cursor: "pointer",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    backgroundColor: showAll ? getCssPropertyValue("--primary-100") : "transparent",
    ":hover": {
      backgroundColor: "rgb(104, 189, 104)",
    },
  };

  return (
    <div>
      <div className="entry">
        <Button
          sx={{...btnTheme}}
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {opp.company}
        </Button>
        {showAll && (
          <EntryInfo
            opp={opp}
            handleDelete={handleDelete}
            notification={notification}
            notificationOpen={notificationOpen}
            notificationType={notificationType}
            handleClose={handleClose}
            setNotification={setNotification}
            setNotificationOpen={setNotificationOpen}
            setNotificationType={setNotificationType}
          />
        )}
      </div>
    </div>
  );
};

export default Entries;
