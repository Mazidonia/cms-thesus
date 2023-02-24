import styled from "@emotion/styled";
import { styled as MUIStyle } from "@mui/material/styles";
import { THEME } from "libs/styles/const";
import { Typography } from "@mui/material";

const ClassRequired = "hasRequired";

export const ResponsiveWrapper = styled.div`
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
`;

export const SButtonWrapper = styled.div`
  & > * {
    margin: 4px !important;
  }
`;

export const SError = MUIStyle(Typography)({
  color: THEME.cDangerMain,
});

export const InputLabel = styled(Typography)`
  font-size: 14px;
  color: ${THEME.cTextDark};
  &.${ClassRequired}:after {
    content: " *";
    color: ${THEME.cErrorMain};
    font-weight: 900;
  }
`;

export const InputLabelWarning = styled(Typography)`
  font-size: 12px;
  color: ${THEME.cErrorMain};
  font-weight: 900;
`;
