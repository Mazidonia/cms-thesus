import React, { forwardRef } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabelMUI from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { THEME } from "libs/styles/const";
import classNames from "classnames";
import styledEmotion from "@emotion/styled";

const ClassRequired = "hasRequired";

const SWrapper = styledEmotion.div`

`;

const SInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "&.MuiInputBase-root": {
    border: `1px solid ${THEME.cPrimary}`,
    borderRadius: 4,
    width: "100%",
    backgroundColor: "#FFFFFF",
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

export const InputLabel = styled(InputLabelMUI)`
  font-size: 14px;
  color: ${THEME.cTextDark};
  &.${ClassRequired}:after {
    content: " *";
    color: ${THEME.cErrorMain};
    font-weight: 900;
  }
`;

const Input = (props, ref) => {
  const { isError, errorMsg, label, hasRequired, ...other } = props;
  const inputIdentifier = props.id || props.name;
  return (
    <SWrapper>
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
          error={isError}
          {...other}
          inputRef={ref}
          id={inputIdentifier}
        />
        {isError && (
          <SError noWrap variant="caption" gutterBottom>
            {errorMsg}
          </SError>
        )}
      </FormControl>
    </SWrapper>
  );
};

export default forwardRef(Input);
