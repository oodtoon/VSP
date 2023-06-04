import { Button } from "@mui/material";
import Entries from "../Entries";
import PleaseLogIn from "../PleaseLogIn";
import { useState } from "react";
import Notification from "../Notification";

const Opportunities = (props) => {
  const [status, setStatus] = useState("Open");

  const userOpps =
    props.user === null
      ? ["please log in"]
      : props.opps.filter((opp) => opp.user.username === props.user.username);

  const handleOppStatus = (event) => {
    setStatus(event.target.value);
  };

  const selectedOpps = userOpps.filter((opp) => opp.status === status);

  const oppsList = () => (
    <>
      <h2>Your Opportunities</h2>
      <Button
        sx={{ mr: "20px", mb: "20px" }}
        value="Open"
        onClick={handleOppStatus}
      >
        Open
      </Button>
      <Button
        sx={{ mr: "20px", mb: "20px" }}
        value="Won"
        onClick={handleOppStatus}
      >
        Won
      </Button>
      <Button sx={{ mb: "20px" }} value="Lost" onClick={handleOppStatus}>
        Lost
      </Button>
      {selectedOpps.map((opp) => (
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
    </>
  );
};

export default Opportunities;
