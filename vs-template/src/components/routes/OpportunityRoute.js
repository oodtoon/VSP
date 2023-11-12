import { Button, TextField, Container } from "@mui/material";
import Entries from "../Entries";
import PleaseLogIn from "../PleaseLogIn";
import { useState } from "react";
import Notification from "../Notification";
import { getCssPropertyValue } from "../../utils/style";

const Opportunities = (props) => {

  const [status, setStatus] = useState("Open");

  const [search, setSearch] = useState('')

  const toggleButtonStlye = {
    backgroundColor: getCssPropertyValue("--primary-300"),
    mr: "20px",
    mb: "20px",
  };

 

  const userOpps =
    props.user === null
      ? ["please log in"]
      : props.opps.filter((opp) => opp.user.username === props.user.username);

  const handleOppStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const selectedOpps = userOpps.filter((opp) => opp.status === status);

  const searchedOpps = search === "" ? selectedOpps : selectedOpps.filter(opp => opp.company.toLowerCase().includes(search.toLowerCase()))

  const oppsList = () => (
    <>
      <h2>Your Opportunities</h2>
      <Button
        sx={{
          ...toggleButtonStlye,
          backgroundColor:
            status === "Open"
              ? getCssPropertyValue("--secondary-200")
              : getCssPropertyValue("--primary-200"),
        }}
        value="Open"
        onClick={handleOppStatus}
      >
        Open
      </Button>
      <Button
        sx={{
          ...toggleButtonStlye,
          backgroundColor:
            status === "Won"
              ? getCssPropertyValue("--secondary-200")
              : getCssPropertyValue("--primary-200"),
        }}
        value="Won"
        onClick={handleOppStatus}
      >
        Won
      </Button>
      <Button
        sx={{
          ...toggleButtonStlye,
          backgroundColor:
            status === "Lost"
              ? getCssPropertyValue("--secondary-200")
              : getCssPropertyValue("--primary-200"),
        }}
        value="Lost"
        onClick={handleOppStatus}
      >
        Lost
      </Button>
      <TextField
        
        size="small"
        label="Search Company"
        type="text"
        placeholder="Search Company"
        className="search"
        onChange={handleSearch}
      />
      {searchedOpps.map((opp) => (
        <Entries
          key={opp.id}
          opp={opp}
          handleDelete={() => props.handleDelete(opp.company, opp.id)}
          notification={props.notification}
          notificationOpen={props.notificationOpen}
          notificationType={props.notificationType}
          handleClose={props.handleClose}
          setNotification={props.setNotification}
          setNotificationOpen={props.setNotificationOpen}
          setNotificationType={props.setNotificationType}
        />
      ))}
    </>
  );

  return (
    <>
      <Container>
        {props.user === null && (
          <div>
            <PleaseLogIn info={"opportunties"} />
          </div>
        )}
        {props.user !== null && oppsList()}
        <Notification
          notification={props.notification}
          notificationOpen={props.notificationOpen}
          notificationType={props.notificationType}
          handleClose={props.handleClose}
        />
      </Container>
    </>
  );
};

export default Opportunities;
