import { useState } from "react";
import { Button, useTheme } from "@mui/material";
import ToggleCopy from "./ToggleCopy";
import InLineEdit from "./InLineEdit";
import "../App.css";

const EntryBtn = {
  color: "#000",
};

const EntryInfo = ({ opp }) => {
  const formatter = () => {
    const oppFirstHalf = [];
    const oppSecondHalf = [];
    
    if ((opp.company !== "" && JSON.parse(localStorage.getItem('company')) === true) || (localStorage.getItem('company') === null && opp.company !== "" )){
      oppFirstHalf.push("Company: " + opp.company);
    }

    if (opp.contact !== "" && JSON.parse(localStorage.getItem('contact')) === true) {
      oppFirstHalf.push("Contact: " + opp.contact);
    }

    if (opp.businessIssue !== "" && JSON.parse(localStorage.getItem('businessIssue')) === true) {
      oppFirstHalf.push("Business Issue: " + opp.businessIssue);
    }

    if (opp.anxietyQ !== "" && JSON.parse(localStorage.getItem('anxietyQ')) === true) {
      oppFirstHalf.push("Anxiety Question: " + opp.anxietyQ);
    }

    if (opp.problem !== "" && JSON.parse(localStorage.getItem('problem')) === true) {
      oppSecondHalf.push("Problem: " + opp.problem);
    }

    if (opp.solution !== "" && JSON.parse(localStorage.getItem('solution')) === true) {
      oppSecondHalf.push("Solution: " + opp.solution);
    }

    if (opp.value !== "" && JSON.parse(localStorage.getItem('value')) === true) {
      oppSecondHalf.push("Value: " + opp.value);
    }

    if (opp.power !== "" && JSON.parse(localStorage.getItem('power')) === true) {
      oppSecondHalf.push("Power: " + opp.power);
    }

    if (opp.plan !== "" && JSON.parse(localStorage.getItem('plan')) === true) {
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

  return (
    <div>
      <fieldset className="entry-details">
        <label className="display-label">
          Company:{" "}
          <InLineEdit
            text={opp.company}
            keyToEdit={"company"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"company"} />
        </label>
        <label>
          Contact:{" "}
          <InLineEdit
            text={opp.contact}
            keyToEdit={"contact"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"contact"} />
        </label>
        <label>
          Business Issue:
          <InLineEdit
            text={opp.businessIssue}
            keyToEdit={"businessIssue"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"businessIssue"} />
        </label>
        <label>
          Anxiety Question:{" "}
          <InLineEdit
            text={opp.anxietyQ}
            keyToEdit={"anxietyQ"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"anxietyQ"} />
        </label>
        <br />
        <label>
          Problem:{" "}
          <InLineEdit
            text={opp.problem}
            keyToEdit={"problem"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"problem"} />
        </label>
        <label>
          Solution:{" "}
          <InLineEdit
            text={opp.solution}
            keyToEdit={"solution"}
            opportunity={opp}
          />
          <ToggleCopy keyToEdit={"solution"} />
        </label>
        <label>
          Value:{" "}
          <InLineEdit text={opp.value} keyToEdit={"value"} opportunity={opp} />
          <ToggleCopy keyToEdit={"value"} />
        </label>
        <label>
          Power:{" "}
          <InLineEdit text={opp.power} keyToEdit={"power"} opportunity={opp} />
          <ToggleCopy keyToEdit={"power"} />
        </label>
        <label>
          Plan:{" "}
          <InLineEdit text={opp.plan} keyToEdit={"plan"} opportunity={opp} />
          <ToggleCopy keyToEdit={"plan"} />
        </label>
      </fieldset>
      <Button variant="contained" onClick={handleCopy} sx={{ mb: '50px' }}>
        Copy Opportunity to Clipboard
      </Button>
    </div>
  );
};

const Entries = ({ opp }) => {
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();

  const btnTheme = {
    ...EntryBtn,
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  };
  return (
    <div className="entry">
      <button
        className="entry-btn fade"
        style={btnTheme}
        onClick={() => {
          setShowAll(!showAll);
        }}
      >
        {opp.company}
      </button>
      {showAll && <EntryInfo opp={opp} />}
    </div>
  );
};

export default Entries;
