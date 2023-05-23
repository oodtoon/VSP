import PleaseLogIn from "../PleaseLogIn";

const { TextField } = require("@mui/material");

const GamePlan = (props) => {
  return (
    <>
      {props.user === null && <PleaseLogIn info={"game plan"} />}
      {props.user !== null && (
        <div>
          <h1>Game Plan</h1>
          <TextField
            size="small"
            type="text"
            placeholder="Game Plan"
            className="GamePlan-form"
            label="Game Plan"
            multiline
          />
        </div>
      )}
    </>
  );
};

export default GamePlan;
