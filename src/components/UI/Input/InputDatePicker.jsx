import React, { forwardRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { InputLabel } from "./index";
import FormControl from "@mui/material/FormControl";
import { THEME } from "../../Theme/const";

const SInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "&.MuiInputBase-root": {
    border: `1px solid ${THEME.cPrimary}`,
    borderRadius: 4,
    width: "100%",
  },
  "&.MuiInputBase-root.Mui-error": {
    border: `1px solid ${THEME.cErrorMain}`,
    borderRadius: 4,
  },

  "&.Mui-focused": {
    boxShadow: `${alpha(THEME.cPrimary, 0.25)} 0 0 0 0.2rem`,
    borderColor: THEME.cPrimary,
  },
  "&.Mui-focused.Mui-error": {
    boxShadow: `${alpha("#FC601C", 0.25)} 0 0 0 0.2rem`,
    borderColor: THEME.cErrorMain,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    fontSize: 16,
    padding: "6px 8px",
  },
}));

// const SError = styled(Typography)({
//   color: THEME.cErrorMain,
// });

const InputDatePicker = (props, ref) => {
  const { value, isError, label, ...inputProps } = props;

  const inputIdentifier = inputProps.id || inputProps.name;
  return (
    <FormControl fullWidth variant="standard">
      {label && (
        <InputLabel shrink error={isError}>
          {label}
        </InputLabel>
      )}
      <SInput
        id={inputIdentifier}
        inputRef={ref}
        error={isError}
        {...inputProps}
        autoComplete="off"
        value={value}
      />
    </FormControl>
  );
};

export default forwardRef(InputDatePicker);
