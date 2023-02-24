import React, { useState } from "react";
import { Pagination, Grid } from "@mui/material";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PDFPreview = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onChangePageHandler = (event, newPage) => {
    setPageNumber(newPage);
  };

  const { file } = props;
  return (
    <div>
      <Grid container direction='column' alignItems='center' justify='center'>
        <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
          <div
            style={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </Grid>
      </Grid>
      <Grid container direction='column' alignItems='center' justify='center'>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ textAlign: "center", padding: "20px" }}>
          <Pagination
            count={numPages || 0}
            defaultPage={1}
            variant='outlined'
            shape='rounded'
            page={pageNumber || 0}
            onChange={onChangePageHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PDFPreview;
