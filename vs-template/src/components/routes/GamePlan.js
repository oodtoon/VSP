import OpportunitySelector from "../OpportunitySelector";
import PleaseLogIn from "../PleaseLogIn";

const GamePlan = (props) => {

  return (
    <>
      {props.user === null && <PleaseLogIn info={"game plan"} />}
      {props.user !== null && (
        <div>
          <h1>Game Plan</h1>

          <OpportunitySelector opps={props.opps} user={props.user} setOpps={props.setOpps}/>

        </div>
      )}
    </>
  );
};

export default GamePlan;
