import { useState } from "react";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Button } from "@mui/material";
import oppService from "../services/opps";

const GamePlanForm = (props) => {
  const text = props.opportunity.gamePlan;
  const [gamePlan, setGamePlan] = useState(text);

  const handleGamePlanChange = (event) => {
    setGamePlan(event.target.value);
  };

  useEffect(() => {
    setGamePlan(text);
  }, [props.opportunity]);

  const addGamePlan = (event) => {
    event.preventDefault();

    handleBlur();
  };

  console.log(props.opps);

  const handleBlur = () => {
    const oppObj = {
      gamePlan: gamePlan,
    };

    if (props.opportunity.gamePlan !== gamePlan) {
      oppService.update(oppObj, props.opportunity.id).then((returnedOpp) => {
        const updatedOpps = props.opps.map((opp) =>
          opp.id === returnedOpp.id ? { ...opp, gamePlan: gamePlan } : opp
        );
        props.setOpps(updatedOpps);
      });
    }
  };

  return (
    <>
      <form onSubmit={addGamePlan}>
        <TextField
          size="small"
          type="text"
          variant="standard"
          placeholder="Enter Game Plan"
          className="GamePlan-form"
          label="Game Plan"
          onBlur={handleBlur}
          onChange={handleGamePlanChange}
          value={gamePlan}
          multiline
          minRows={15}
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          className="submit-btn"
          sx={{ mt: "20px" }}
        >
          Set Game Plan
        </Button>
      </form>
    </>
  );
};

const OpportunitySelector = (props) => {
  const userOpps =
    props.user === null
      ? [{ company: "No Opportunities Loaded", id: "69" }, "now"]
      : props.opps.filter((opp) => opp.user.username === props.user.username && opp.status === "Open");

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
          <GamePlanForm
            opportunity={opportunity}
            opps={props.opps}
            setOpps={props.setOpps}
          />
        </div>
      )}
    </div>
  );
};

export default OpportunitySelector;
