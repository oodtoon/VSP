import { useEffect, useRef, useState } from "react";
import "../App.css";
import { TextField, useTheme } from "@mui/material";

const EntryBtn = {
    color: '#000'
}

const InLineEdit = ({ opp, setOpp }) => {
  const [oppEdit, setOppEdit] = useState(opp);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);
  const onChange = (event) => setOppEdit(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  };

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
        onBlur={() => setIsInputHidden(true)}
        onClick={() => setIsInputHidden(false)}
        inputProps={{ ref: (input) => (inputRef.current = input) }}
        size="small"
        className={`inline-edit ${isInputHidden ? "hidden" : ""}`}
        multiline
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

const EntryInfo = ({ opp, setOpp }) => {
  return (
    <fieldset className="entry-details">
      <label>
        Company: <InLineEdit opp={opp.company} setOpp={setOpp} />
      </label>
      <label>
        Contact: <InLineEdit opp={opp.contact} setOpp={setOpp} />
      </label>
      <label>
        Business Issue:
        <InLineEdit opp={opp.businessIssue} setOpp={setOpp} />
      </label>
      <label>
        Anxiety Question: <InLineEdit opp={opp.anxietyQ} setOpp={setOpp} />
      </label>
      <br />
      <label>
        Problem: <InLineEdit opp={opp.problem} setOpp={setOpp} />
      </label>
      <label>
        Solution: <InLineEdit opp={opp.solution} setOpp={setOpp} />
      </label>
      <label>
        Value: <InLineEdit opp={opp.value} setOpp={setOpp} />
      </label>
      <label>
        Power: <InLineEdit opp={opp.power} setOpp={setOpp} />
      </label>
      <label>
        Plan: <InLineEdit opp={opp.plan} setOpp={setOpp} />
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
