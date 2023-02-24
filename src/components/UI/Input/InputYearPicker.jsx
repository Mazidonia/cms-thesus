import React, { forwardRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabelMUI from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { THEME } from "../../Theme/const";
import classNames from "classnames";

const ClassRequired = "hasRequired";

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

const SError = styled(Typography)`
  color: ${THEME.cErrorMain};
`;

const InputLabel = styled(InputLabelMUI)`
  font-size: 18px;
  color: ${THEME.cTextDark};
  &.${ClassRequired}:after {
    content: " *";
    color: ${THEME.cErrorMain};
    font-weight: 900;
  }
`;

const InputYearPicker = (props, ref) => {
  const {
    value,
    isError,
    errorMsg,
    label,
    hasRequired,
    placeholder,
    ...otherProps
  } = props;

  const inputIdentifier = otherProps.id || otherProps.name;
  return (
    <FormControl fullWidth variant="standard">
      {label && (
        <InputLabel
          shrink
          error={isError}
          className={classNames(hasRequired && ClassRequired)}
        >
          {label}
        </InputLabel>
      )}
      <SInput
        placeholder={placeholder}
        id={inputIdentifier}
        inputRef={ref}
        error={isError}
        {...otherProps}
        autoComplete="off"
        value={value}
      />
      {isError && (
        <SError noWrap variant="caption" gutterBottom>
          {errorMsg}
        </SError>
      )}
    </FormControl>
  );
};

export default forwardRef(InputYearPicker);
