import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import oppService from "../services/opps";

const StatusSelect = ({
  oppStatus,
  opp,
  setNotification,
  setNotificationOpen,
  setNotificationType,
}) => {
  const [status, setStatus] = useState(oppStatus);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    const oppObj = {
      ...opp,
      status: event.target.value,
      user: opp.user.id,
    };

    oppService.updateFullOpp(oppObj, opp.id);

    if (event.target.value === "Won") {
      setNotification("Opporutinty Won! Congrats!");
      setNotificationOpen(true);
      setNotificationType("success");
    }
  };

  return (
    <div>
      <FormControl sx={{ pl: "25px" }}>
        <FormLabel id="controlled-status-group">Opportunity Status:</FormLabel>
        <RadioGroup
          row
          aria-labelledby="controlled-status-group"
          name="controlled-radio-buttons-group"
          value={status}
          onChange={handleStatusChange}
        >
          <FormControlLabel value="Open" control={<Radio />} label="Open" />
          <FormControlLabel value="Won" control={<Radio />} label="Won" />
          <FormControlLabel value="Lost" control={<Radio />} label="Lost" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default StatusSelect;
