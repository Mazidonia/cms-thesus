import * as React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  typographyStyle: {
    "&::before": {
      content: '""',
      position: "absolute",
      display: "block",
      width: "120px",
      height: "1px",
      background: "#ddd",
      bottom: "1px",
      left: "calc(50% - 60px)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      display: "block",
      width: "40px",
      height: "3px",
      background: "#412e5c",
      bottom: "0px",
      left: "calc(50% - 20px)",
    },
  },
  root: {
    position: "relative",
    width: "auto",
    textAlign: "center",
    padding: 10,
    marginTop: 16,
    marginBottom: 32,
  },
}));

const DivStyle = styled("div")`
  display: inline-block;
  width: 40%;
  border-bottom: 1px dotted #4d255d;
  border-top: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;
`;

const TypographyCustom = styled(Typography)`
  color: #4d255d;
  text-transform: uppercase;
  background: #fff;
  padding: 0 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -40%);
`;

const TypographyTitle = (props) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <DivStyle>
        <TypographyCustom
          color="textPrimary"
          variant="h4"
          //className={styles.typographyStyle}
        >
          {props.title}
        </TypographyCustom>
      </DivStyle>
    </div>
  );
};
export default TypographyTitle;
