import { useEffect, useState } from "react";
import { Switch } from "@mui/material";

const ToggleCopy = (props) => {
    let fieldToCopy = JSON.parse(localStorage.getItem(props.keyToEdit));
  
    const [isCopyable, setIsCopyable] = useState(fieldToCopy || true);
  
    const handleCopyToggle = () => {
      localStorage.setItem(props.keyToEdit, !isCopyable);
      setIsCopyable(!isCopyable);
    };
  
    useEffect(() => {
      if (fieldToCopy === true) {
        setIsCopyable(true);
      } else {
        setIsCopyable(false);
      }
    }, [fieldToCopy]);
  
    return (
      <>
        <Switch checked={isCopyable} onClick={handleCopyToggle}></Switch>
      </>
    );
  };

  export default ToggleCopy