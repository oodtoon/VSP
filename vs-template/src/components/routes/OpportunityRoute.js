import Entries from "../Entries";


const Opportunities = (props) => {
    return (
        <>
        <h2>Your Opportunities</h2>
        {props.opps.map((opp) => (
              <Entries key={opp.id} opp={opp} />
            ))}
        </>
    )
}

export default Opportunities