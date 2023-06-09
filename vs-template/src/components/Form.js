import { Button, TextField, useTheme, Container } from "@mui/material";
import Entries from "./Entries";
import "../App.css";
import { getCssPropertyValue } from "../utils/style";
import Notification from "./Notification";
import LandingPage from "./LandingPage";

const inputStyle = {
  backgroundColor: "white",
  borderRadius: "4px",
};

const basicStyle = {
  textAlign: "right",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
};

const mainStyle = {
  display: "grid",
  gridTemplate: "auto auto / auto auto",
  backgroundColor: getCssPropertyValue("--secondary-200"),
  borderRadius: "4px",
  textAlign: "center",
  margin: "0 0 10px 0",
};

const mainLabel = {
  fontSize: "x-large",
  color: getCssPropertyValue("--primary-300"),
};

const MainInput = (props) => {
  const theme = useTheme();

  return (
    <div
      className="main-fieldset"
      style={{
        ...mainStyle,
        backgroundColor:
          theme.palette.mode === "dark"
            ? getCssPropertyValue("--primary-100")
            : getCssPropertyValue("--secondary-200"),
      }}
    >
      <fieldset>
        <div>
          <label style={props.labelStyle} htmlFor="problem">
            Problem
          </label>
          <TextField
            id="problem"
            multiline
            placeholder="What is the problem this company is facing?"
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
            placeholder="What is their ideal solution that you can offer?"
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
            placeholder="What value will they get out of your solution?"
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
      <div className="sub-label">
        <label style={props.labelStyle} htmlFor="power">
          Power
        </label>
        <TextField
          id="power"
          type="text"
          placeholder="Who is the decision maker? (hint: it might not be your contact)"
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
          placeholder="What is your mutal plan moving forward?"
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
    <fieldset
      className="basic-fieldset"
      style={{
        ...basicStyle,
        backgroundColor:
          theme.palette.mode === "dark"
            ? getCssPropertyValue("--primary-100")
            : getCssPropertyValue("--secondary-200"),
      }}
    >
      <label className="basic-label" style={props.labelStyle}>
        Company
        <TextField
          size="small"
          type="text"
          placeholder="Company name"
          className="medium-input"
          onChange={props.handleCompany}
          value={props.company}
          sx={{ inputStyle, ml: "10px" }}
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
          sx={{ inputStyle, ml: "10px" }}
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
          sx={{ inputStyle, ml: "10px" }}
        />
      </label>
      <label className="basic-label" style={props.labelStyle}>
        Anxiety Question
        <TextField
          size="small"
          type="text"
          placeholder="What question will create urgency for your contact?"
          className="long-input"
          onChange={props.handleAnxietyQ}
          value={props.anxietyQ}
          sx={{ inputStyle, ml: "10px" }}
        />
      </label>{" "}
    </fieldset>
  );
};

const Form = (props) => {
  const theme = useTheme();

  const labelStyle = {
    ...mainLabel,
    color:
      theme.palette.mode === "dark"
        ? "#fff"
        : getCssPropertyValue("--primary-300"),
  };

  const loginForm = () => (
    <div>
      <LandingPage
        username={props.username}
        setUsername={props.setUsername}
        password={props.password}
        setPassword={props.setPassword}
        handleLogin={props.handleLogin}
        handleUsername={props.handleUsername}
        handlePassword={props.handlePassword}
        notification={props.notification}
        notificationOpen={props.notificationOpen}
        notificationType={props.notificationType}
      />
  

    </div>
  );

  const oppForm = () => (
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
  );

  const userOpps =
    props.user === null
      ? ["please log in"]
      : props.opps.filter(
          (opp) =>
            opp.user.username === props.user.username && opp.status === "Open"
        );

  const entryList = () => {
    return (
      <>
        {userOpps.length === 0 && <h1>no current oppotunities</h1>}
        {userOpps !== null &&
          userOpps.map((opp) => (
            <Entries
              key={opp.id}
              opp={opp}
              handleDelete={() => props.handleDelete(opp.company, opp.id)}
            />
          ))}
      </>
    );
  };

  return (
    <div>
      <Notification
        notification={props.notification}
        notificationOpen={props.notificationOpen}
        notificationType={props.notificationType}
        handleClose={props.handleClose}
      />
      {props.user === null && loginForm()}
      <Container>
        {props.user !== null && oppForm()}
        {props.user !== null && entryList()}
      </Container>
    </div>
  );
};

export default Form;
