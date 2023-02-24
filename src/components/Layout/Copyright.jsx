import * as React from "react";
import styled from "@emotion/styled";
import { Typography, Grid, Link } from "@mui/material";

const FooterContainer = styled.div`
  text-align: center;
  align-items: center;
  padding: 8px;
  color: #ffffff;
  background: #000000;
`;

const Copyright = (props) => {
  return (
    <Grid>
      <Grid item xs={12}>
        <FooterContainer>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
          >
            {"Copyright © "}
            <Link
              sx={{ color: "#ffffff" }}
              href="https://pre-degree.pcru.ac.th"
            >
              pre-degree.pcru.ac.th
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </FooterContainer>
      </Grid>
    </Grid>
  );
};

export default Copyright;
