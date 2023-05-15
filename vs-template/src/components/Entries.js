import { useEffect, useRef, useState } from "react";
import "../App.css";
import { TextField, useTheme } from "@mui/material";
import oppService from "../services/opps";

const EntryBtn = {
    color: '#000'
}

const InLineEdit = ({ opp, edit, opportunity }) => {
  const [oppEdit, setOppEdit] = useState(opp);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);
  const onChange = (event) => setOppEdit(event.target.value);

  const onKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey && isInputHidden === false) {
      setIsInputHidden(true)
    }
  };

  const blurHandler = (event) => {
    const oppObject = {
     [edit]: oppEdit
    }
    if (oppEdit !== opp) {
      oppService.update(oppObject, opportunity.id).then((returnedOpp) => {
        setIsInputHidden(true)
        setOppEdit(returnedOpp[edit]);
      
      });
    } else {
      setIsInputHidden(true)
    }

  }

  useEffect(() => {
    if (!isInputHidden) {
      inputRef.current.focus();
    }
  }, [isInputHidden]);

  return (
    <>
      <TextField
        type="text"
        value={oppEdit}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={blurHandler}
        onClick={() => setIsInputHidden(false)}
        inputProps={{ ref: (input) => (inputRef.current = input) }}
        size="small"
        className={`inline-edit ${isInputHidden ? "hidden" : ""}`}
        multiline
        sx={{ width: '80%' }}
      />

      <span
        style={{ fontWeight: "initial" }}
        onClick={() => setIsInputHidden(false)}
        tabIndex={0}
        onFocus={() => {
          setIsInputHidden(false);
        }}
        hidden={!isInputHidden}
      >
        {oppEdit}
      </span>
    </>
  );
};

const EntryInfo = ({ opp }) => {

  return (
    <fieldset className="entry-details">
      <label className="display-label">
        Company: <InLineEdit opp={opp.company} edit={"company"} opportunity={opp}/>
      </label>
      <label>
        Contact: <InLineEdit opp={opp.contact} edit={"contact"} opportunity={opp}/>
      </label>
      <label>
        Business Issue:
        <InLineEdit opp={opp.businessIssue} edit={"businessIssue"} opportunity={opp}/>
      </label>
      <label>
        Anxiety Question: <InLineEdit opp={opp.anxietyQ} edit={"anxietyQ"} opportunity={opp}/>
      </label>
      <br />
      <label>
        Problem: <InLineEdit opp={opp.problem}  edit={"problem"} opportunity={opp}/>
      </label>
      <label>
        Solution: <InLineEdit opp={opp.solution} edit={"solution"} opportunity={opp}/>
      </label>
      <label>
        Value: <InLineEdit opp={opp.value} edit={"value"} opportunity={opp}/>
      </label>
      <label>
        Power: <InLineEdit opp={opp.power} edit={"power"} opportunity={opp}/>
      </label>
      <label>
        Plan: <InLineEdit opp={opp.plan} edit={"plan"} opportunity={opp}/>
      </label>
    </fieldset>
  );
};

const Entries = ({ opp }) => {
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme()

  const btnTheme = { ...EntryBtn, color: theme.palette.mode === 'dark' ? '#fff' : '#000'}
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
