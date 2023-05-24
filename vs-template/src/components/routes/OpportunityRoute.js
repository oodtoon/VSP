import Entries from "../Entries";
import PleaseLogIn from "../PleaseLogIn";

const Opportunities = (props) => {
  const userOpps = props.user === null ? ['please log in'] : props.opps.filter(
    (opp) => opp.user.username === props.user.username
  );

  const oppsList = () => (
    <>
      <h2>Your Opportunities</h2>
      {userOpps.map((opp) => (
        <Entries
          key={opp.id}
          opp={opp}
          handleDelete={() => props.handleDelete(opp.company, opp.id)}
        />
      ))}
    </>
  );

  return (
    <>
      {props.user === null && (
        <div>
          <PleaseLogIn info={"opportunties"} />
        </div>
      )}
      {props.user !== null && oppsList()}
    </>
  );
};

export default Opportunities;
