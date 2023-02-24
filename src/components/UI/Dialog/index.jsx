import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Cancel as CancelIcon } from "@mui/icons-material/";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DialogConfirm = (props) => {
  const {
    title,
    msg,
    isOpen,
    isLoading,
    handleClose,
    handleConfirm,
    handleCancel,
    confirmText,
    cancelText,
    cancelBtn,
    discardText,
  } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        aria-labelledby="dialog-confirm-title"
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle id="dialog-confirm-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {cancelBtn && (
            <LoadingButton
              onClick={handleCancel}
              autoFocus
              variant="contained"
              size="small"
              color="secondary"
              startIcon={<CancelIcon />}
              loading={isLoading}
              loadingPosition="start"
            >
              {cancelText ? cancelText : "ยกเลิก"}
            </LoadingButton>
          )}
          <LoadingButton
            onClick={handleConfirm}
            autoFocus
            variant="contained"
            size="small"
            color="primary"
            startIcon={<CheckCircleIcon />}
            loading={isLoading}
            loadingPosition="start"
          >
            {confirmText ? confirmText : "ตกลง"}
          </LoadingButton>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="inherit"
            disabled={isLoading}
            startIcon={<CancelIcon />}
          >
            {discardText ? discardText : "ละทิ้ง"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
