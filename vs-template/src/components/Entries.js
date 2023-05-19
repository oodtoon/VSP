import { useState } from "react";
import { Button, useTheme } from "@mui/material";
import ToggleCopy from "./ToggleCopy";
import InLineEdit from "./InLineEdit";
import oppService from '../services/opps'
import "../App.css";

const EntryBtn = {
  color: "#000",
};

const EntryInfo = ({ opp, handleDelete }) => {

  const formatter = () => {
    const oppFirstHalf = [];
    const oppSecondHalf = [];
    
    if ((opp.company !== "" && JSON.parse(localStorage.getItem('company')) === true) || (localStorage.getItem('company') === null && opp.company !== "" )){
      oppFirstHalf.push("Company: " + opp.company);
    }

    if ((opp.contact !== "" && JSON.parse(localStorage.getItem('contact')) === true) || (localStorage.getItem('contact') === null && opp.contact !== "" )) {
      oppFirstHalf.push("Contact: " + opp.contact);
    }

    if ((opp.businessIssue !== "" && JSON.parse(localStorage.getItem('businessIssue')) === true) || (localStorage.getItem('businessISsue') === null && opp.businessIssue !== "" )) {
      oppFirstHalf.push("Business Issue: " + opp.businessIssue);
    }

    if ((opp.anxietyQ !== "" && JSON.parse(localStorage.getItem('anxietyQ')) === true) || (localStorage.getItem('anxietyQ') === null && opp.anxiety !== "" )) {
      oppFirstHalf.push("Anxiety Question: " + opp.anxietyQ);
    }

    if ((opp.problem !== "" && JSON.parse(localStorage.getItem('problem')) === true) || (localStorage.getItem('problem') === null && opp.problem !== "" ))  {
      oppSecondHalf.push("Problem: " + opp.problem);
    }

    if ((opp.solution !== "" && JSON.parse(localStorage.getItem('solution')) === true) || (localStorage.getItem('solution') === null && opp.solution !== "" )) {
      oppSecondHalf.push("Solution: " + opp.solution);
    }

    if ((opp.value !== "" && JSON.parse(localStorage.getItem('value')) === true) || (localStorage.getItem('value') === null && opp.value !== "" )) {
      oppSecondHalf.push("Value: " + opp.value);
    }

    if ((opp.power !== "" && JSON.parse(localStorage.getItem('power')) === true) || (localStorage.getItem('power') === null && opp.power !== "" )){
      oppSecondHalf.push("Power: " + opp.power);
    }

    if ((opp.plan !== "" && JSON.parse(localStorage.getItem('plan')) === true) || (localStorage.getItem('plan') === null && opp.plan !== "" )) {
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
        <ToggleCopy keyToEdit={"company"} />
          Company:{" "}
          <InLineEdit
            text={opp.company}
            keyToEdit={"company"}
            opportunity={opp}
          />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"contact"} />
          Contact:{" "}
          <InLineEdit
            text={opp.contact}
            keyToEdit={"contact"}
            opportunity={opp}
          />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"businessIssue"} />
          Business Issue:
          <InLineEdit
            text={opp.businessIssue}
            keyToEdit={"businessIssue"}
            opportunity={opp}
          />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"anxietyQ"} />
          Anxiety Question:{" "}
          <InLineEdit
            text={opp.anxietyQ}
            keyToEdit={"anxietyQ"}
            opportunity={opp}
          />
          
        </label>
        <br />
        <label>
        <ToggleCopy keyToEdit={"problem"} />
          Problem:{" "}
          <InLineEdit
            text={opp.problem}
            keyToEdit={"problem"}
            opportunity={opp}
          />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"solution"} />
          Solution:{" "}
          <InLineEdit
            text={opp.solution}
            keyToEdit={"solution"}
            opportunity={opp}
          />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"value"} />
          Value:{" "}
          <InLineEdit text={opp.value} keyToEdit={"value"} opportunity={opp} />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"power"} />
          Power:{" "}
          <InLineEdit text={opp.power} keyToEdit={"power"} opportunity={opp} />
          
        </label>
        <label>
        <ToggleCopy keyToEdit={"plan"} />
          Plan:{" "}
          <InLineEdit text={opp.plan} keyToEdit={"plan"} opportunity={opp} />
          
        </label>
      </fieldset>
      <Button variant="contained" onClick={handleCopy} sx={{ mb: '50px' }}>
        Copy Opportunity to Clipboard
      </Button>
      <Button variant="contained" onClick={handleDelete} sx={{ mb: '50px', ml: '25px' }}>Delete</Button>
    </div>
  );
};

const Entries = ({ opp, handleDelete }) => {
  console.log(handleDelete)
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
      {showAll && <EntryInfo opp={opp} handleDelete={handleDelete}/>}
    </div>
  );
};

export default Entries;
