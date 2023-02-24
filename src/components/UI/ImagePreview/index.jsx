import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Image from "next/image";

const ImagePreview = (props) => {
  const { file, isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="dialog_preview_image"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <Image src={file} alt="Thumb" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="danger">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImagePreview;
