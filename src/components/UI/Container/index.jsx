import styled from "@emotion/styled";
import { getCss } from "libs/styles";
import { Box, Grid } from "@mui/material";

export const SPageContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SPageFilterForm = styled.form`
  position: relative;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px ${getCss("cTextPrimary")};
  background-color: ${getCss("cPrimaryLight")};
  margin-bottom: 12px;
`;
