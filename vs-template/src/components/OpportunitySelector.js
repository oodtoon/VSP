import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const OpportunitySelector = (props) => {
  const userOpps =
    props.user === null
      ? [{ company: "No Opportunities Loaded", id: "69" }, "now"]
      : props.opps.filter((opp) => opp.user.username === props.user.username);

  const [opportunity, setOpportunity] = useState(userOpps[0]);

  const setOpportunityHelper = (id) => {
    const opp = userOpps.find((o) => o.id === id);
    setOpportunity(opp);
  };

  if (props.opps === undefined) {
    return (
      <div>
        <FormControl sx={{ mb: 5, minWidth: 300 }}>
          <InputLabel id="opportunities">Opportunity</InputLabel>
          <Select
            labelId="oppsId"
            id="opps"
            label="No Opportunities Loaded"
            value={opportunity}
            onChange={(event) => setOpportunityHelper(event.target.value)}
          >
            <MenuItem>No Opportunities Loaded</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      {opportunity !== undefined && (
        <div>
          <FormControl sx={{ mb: 5, minWidth: 300 }}>
            <InputLabel id="opportunities">Opportunity</InputLabel>

            <Select
              labelId="oppsId"
              id="opps"
              label="Opportunity"
              onChange={(event) => setOpportunityHelper(event.target.value)}
              value={opportunity.id}
            >
              {userOpps ? (
                userOpps.map((opp) => (
                  <MenuItem key={opp.id} value={opp.id}>
                    {opp.company}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Create Opportunity First</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default OpportunitySelector;
