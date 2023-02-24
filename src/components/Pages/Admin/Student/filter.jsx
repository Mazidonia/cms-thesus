import React, { forwardRef, useRef, useImperativeHandle } from "react";
import styled from "@emotion/styled";
import { Grid, Button } from "@mui/material/";
import Input, { InputLabel } from "components/UI/Input";
import { SPageFilterForm } from "components/UI/Container";

const Filter = forwardRef((props, forwardedRef) => {
  const { initTextSearch, handleSubmit } = props;
  const inputTextRef = useRef();

  const onSearchHandler = () => {
    handleSubmit({
      textSearch: inputTextRef.current?.value?.trim(),
    });
  };

  const onKeyDownSearchHandler = (e) => {
    if (e.keyCode === 13) {
      onSearchHandler();
      e.stopPropagation();
    }
  };

  useImperativeHandle(forwardedRef, () => ({
    clear: () => {
      console.log();
    },
  }));

  return (
    <SPageFilterForm>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <InputLabel>รหัสนักศึกษา</InputLabel>
          <Input
            size="small"
            placeholder="ค้นหารายวิชา..."
            inputRef={inputTextRef}
            defaultValue={initTextSearch}
            onKeyDown={onKeyDownSearchHandler}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <InputLabel>ชื่อ-สกุล</InputLabel>
          <Input
            size="small"
            placeholder="ค้นหารายวิชา..."
            inputRef={inputTextRef}
            defaultValue={initTextSearch}
            onKeyDown={onKeyDownSearchHandler}
            autoFocus
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6} style={{ marginTop: 20 }}>
          <Button variant="contained" href="#contained-buttons">
            ค้นหา
          </Button>
        </Grid>
      </Grid>
    </SPageFilterForm>
  );
});

Filter.displayName = "Filter";

export default Filter;
