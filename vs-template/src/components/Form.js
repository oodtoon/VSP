import { Button, TextField, useTheme } from "@mui/material";
import Entries from "./Entries";
import "../App.css";
import { getCssPropertyValue } from "../utils/style";

const inputStyle = {
  backgroundColor: "white",
  borderRadius: "4px",
};

const basicStyle = {
    textAlign: 'right',
    backgroundColor: getCssPropertyValue('--secondary-200'),
    borderRadius: '4px',
}

const mainStyle = {
    display: 'grid',
    gridTemplate: 'auto auto / auto auto',
    backgroundColor: getCssPropertyValue('--secondary-200'),
    borderRadius: '4px',
    textAlign: 'center',
    margin: '0 0 10px 0',
}

const mainLabel = {
  fontSize: 'x-large',
  color: getCssPropertyValue('--primary-300')
}

const MainInput = (props) => {
  const theme = useTheme();

  return (
    <div className="basic-label"
    style={{ ...mainStyle, backgroundColor: theme.palette.mode === 'dark' ? getCssPropertyValue('--primary-100') : getCssPropertyValue('--secondary-200') }}>
      <fieldset>
        <div>
          <label style={props.labelStyle} htmlFor="problem">
            Problem
          </label>
          <TextField
            id="problem"
            multiline
            placeholder="Prepare questions for the interation to maximize impact"
            className="full-input"
            onChange={props.handleProblem}
            value={props.problem}
            sx={inputStyle}
          />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label style={props.labelStyle} htmlFor="solution">
            Solution
          </label>
          <TextField
            id="solution"
            multiline
            placeholder="Prepare questions for the interation to maximize impact"
            className="full-input"
            onChange={props.handleSolution}
            value={props.solution}
            sx={inputStyle}
          />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label style={props.labelStyle} htmlFor="value">
            Value
          </label>
          <TextField
            id="value"
            multiline
            placeholder="Prepare questions for the interation to maximize impact"
            className="full-input"
            onChange={props.handleValue}
            value={props.value}
            sx={inputStyle}
          />
        </div>
      </fieldset>
      <fieldset>
        <SubInput
          handlePlan={props.handlePlan}
          plan={props.plan}
          handlePower={props.handlePower}
          power={props.power}
          labelStyle={props.labelStyle}
        />
      </fieldset>
    </div>
  );
};

const SubInput = (props) => {

  return (
    <>
      <div className="sub-label" >
        <label style={props.labelStyle} htmlFor="power">
          Power
        </label>
        <TextField
          id="power"
          type="text"
          placeholder="string 2"
          className="half-input"
          onChange={props.handlePower}
          value={props.power}
          sx={inputStyle}
        />
      </div>
      <div>
        <label style={props.labelStyle} htmlFor="plan">
          Plan
        </label>
        <TextField
          id="plan"
          type="text"
          placeholder="string 1"
          className="half-input"
          onChange={props.handlePlan}
          value={props.plan}
          sx={inputStyle}
        />
      </div>
    </>
  );
};

const BasicInfo = (props) => {
  const theme = useTheme();

  return (
    <fieldset style={{ ...basicStyle, backgroundColor: theme.palette.mode === 'dark' ? getCssPropertyValue('--primary-100') : getCssPropertyValue('--secondary-200') }}>
      <label className="basic-label" style={props.labelStyle}>
        Company
        <TextField
          size="small"
          type="text"
          placeholder="Company name"
          className="medium-input"
          onChange={props.handleCompany}
          value={props.company}
          sx={inputStyle}
          required
        />
      </label>
      <label className="basic-label" style={props.labelStyle}>
        Contact
        <TextField
          size="small"
          type="text"
          placeholder="Contact"
          className="medium-input"
          onChange={props.handleContact}
          value={props.contact}
          sx={inputStyle}
        />
      </label>
      <label className="basic-label" style={props.labelStyle}>
        Business Issue
        <TextField
          size="small"
          type="text"
          placeholder="Business Issue"
          className="long-input"
          onChange={props.handleBusinessIssue}
          value={props.businessIssue}
          sx={inputStyle}
        />
      </label>
      <label className="basic-label" style={props.labelStyle}>
        Anxiety Question
        <TextField
          size="small"
          type="text"
          placeholder="Anxiety Question"
          className="long-input"
          onChange={props.handleAnxietyQ}
          value={props.anxietyQ}
          sx={inputStyle}
        />
      </label>{" "}
    </fieldset>
  );
};

const Form = (props) => {
  const theme = useTheme();

  const labelStyle = {
    ...mainLabel, color: theme.palette.mode === 'dark' ? '#fff' : getCssPropertyValue('--primary-300') 
  }

  return (
    <>
      <form className="form" onSubmit={props.addOpp}>
        <BasicInfo
          handleCompany={props.handleCompany}
          company={props.company}
          handleContact={props.handleContact}
          contact={props.contact}
          handleBusinessIssue={props.handleBusinessIssue}
          businessIssue={props.businessIssue}
          handleAnxietyQ={props.handleAnxietyQ}
          anxietyQ={props.anxietyQ}
          labelStyle={labelStyle}
        />
        <MainInput
          title="main"
          handleProblem={props.handleProblem}
          problem={props.problem}
          handleSolution={props.handleSolution}
          solution={props.solution}
          handleValue={props.handleValue}
          value={props.value}
          handlePlan={props.handlePlan}
          plan={props.plan}
          handlePower={props.handlePower}
          power={props.power}
          labelStyle={labelStyle}
        />
        <Button variant="contained" type="submit" className="submit-btn">
          submit
        </Button>
      </form>
      {props.opps === null && (
        <h1>no current oppotunities</h1>
      )}
      {props.opps !== null && 
      props.opps.map((opp) => (
              <Entries key={opp.id} opp={opp} />
            ))}
    </>
  );
};

export default Form;
