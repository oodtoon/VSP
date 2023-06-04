import { Fragment } from "react";
import { Snackbar, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Notification = ({
  notification,
  notificationOpen,
  notificationType,
  handleClose,
}) => {

  const close = (
    <Fragment>
      <IconButton
        onClick={handleClose}
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon />
      </IconButton>
    </Fragment>
  );

  const vertical = "bottom";
  const horizontal = "left";

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={notificationOpen}
        autoHideDuration={6000}
        message={notification}
        onClose={handleClose}
        action={close}
      >
        <Alert onClose={handleClose} severity={notificationType} variant="filled">
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
