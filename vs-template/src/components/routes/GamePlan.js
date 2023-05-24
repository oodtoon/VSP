import OpportunitySelector from "../OpportunitySelector";
import PleaseLogIn from "../PleaseLogIn";

const { TextField } = require("@mui/material");

const GamePlan = (props) => {
  console.log("opps", props.opps);

  const dummyOpp = {
    company: "no opps loaded",
    id: 38,
  };

  return (
    <>
      {props.user === null && <PleaseLogIn info={"game plan"} />}
      {props.user !== null && (
        <div>
          <h1>Game Plan</h1>

          <OpportunitySelector opps={props.opps} user={props.user} />

          <TextField
            size="small"
            type="text"
            variant="standard"
            placeholder="Game Plan"
            className="GamePlan-form"
            label="Game Plan"
            multiline
            minRows={15}
            fullWidth
          />
        </div>
      )}
    </>
  );
};

export default GamePlan;
