import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  Grid,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import workerSrc from "../../../../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFPreview = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onChangePageHandler = (event, newPage) => {
    setPageNumber(newPage);
  };

  const onCloseHandler = () => {
    handleClose();
    setPageNumber(1);
    setNumPages(null);
  };

  const { file, isOpen, handleClose } = props;
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onCloseHandler}
        aria-labelledby="dialog_preview_image"
        fullWidth
        maxWidth="md"
      >
        <DialogContent style={{ background: "#eee" }}>
          <div>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid
                item
                xs={12}
                sm={12}
                style={{ textAlign: "center", padding: "20px" }}
              >
                <Pagination
                  count={numPages || 0}
                  defaultPage={1}
                  variant="outlined"
                  shape="rounded"
                  page={pageNumber || 0}
                  onChange={onChangePageHandler}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid
                item
                xs={12}
                sm={12}
                style={{ textAlign: "center", padding: "20px" }}
              >
                <Pagination
                  count={numPages || 0}
                  defaultPage={1}
                  variant="outlined"
                  shape="rounded"
                  page={pageNumber || 0}
                  onChange={onChangePageHandler}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseHandler} color="danger">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PDFPreview;
