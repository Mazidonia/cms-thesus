import React from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { Breadcrumbs, Typography, Paper as MuiPaper } from "@mui/material";
import PropTypes from "prop-types";

const Paper = styled(MuiPaper)`
  padding: 2px;
`;

const ContainerWrapper = styled("div")`
  padding-bottom: 10px;
`;

const LabelWrapper = styled("div")`
  padding: 4px;
`;

const BreadcrumbItem = (props) => {
  const breadcrumbs = props.links.map((val, index) => {
    if (props.links.length - 1 === index) {
      return (
        <Typography color="textPrimary" key={index}>
          {val.label}
        </Typography>
      );
    }

    return (
      <Link href={val.href} key={index} color="inherit">
        {val.label}
      </Link>
    );
  });

  return (
    <ContainerWrapper>
      <Paper elevation={0}>
        <LabelWrapper>
          <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
        </LabelWrapper>
      </Paper>
    </ContainerWrapper>
  );
};

BreadcrumbItem.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

BreadcrumbItem.defaultProps = {
  links: [
    {
      href: "/",
      label: "...",
    },
  ],
};

export default BreadcrumbItem;
