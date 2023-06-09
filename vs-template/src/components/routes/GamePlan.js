import OpportunitySelector from "../OpportunitySelector";
import PleaseLogIn from "../PleaseLogIn";
import "../../App.css"
import { Container } from "@mui/material";

const GamePlan = (props) => {

  return (
    <>
      <Container>
        {props.user === null && <PleaseLogIn info={"game plan"} />}
        {props.user !== null && (
          <div className="game-plan">
            <h1>Game Plan</h1>
            <OpportunitySelector opps={props.opps} user={props.user} setOpps={props.setOpps}/>
          </div>
        )}
      </Container>
    </>
  );
};

export default GamePlan;
