import { useState } from "react";
import { Switch } from "@mui/material";

const ToggleCopy = (props) => {
    let fieldToCopy = JSON.parse(localStorage.getItem(props.keyToEdit))
  
    const [isCopyable, setIsCopyable] = useState(fieldToCopy ?? true);
  
    const handleCopyToggle = () => {
      localStorage.setItem(props.keyToEdit, !isCopyable);
      setIsCopyable(!isCopyable);
    };
  
    return (
      <>
        <Switch checked={isCopyable} onClick={handleCopyToggle} sx={{ mt: "5px"}}></Switch>
      </>
    );
  };

  export default ToggleCopy