import Entries from "../Entries";
import PleaseLogIn from "../PleaseLogIn";



const Opportunities = (props) => {
    const oppsList = () => (
        <>
                <h2>Your Opportunities</h2>
            {props.opps.map((opp) => (
                  <Entries key={opp.id} opp={opp} handleDelete={() => props.handleDelete(opp.company, opp.id)}/>
                ))}
        </>
    )
    
    return (
        <>
        {props.user === null && (
            <div>
                <PleaseLogIn info={"opportunties"}/>
            </div>
        )}
        {props.user !== null && (
           oppsList() 
        )}
        </>
    )
}

export default Opportunities