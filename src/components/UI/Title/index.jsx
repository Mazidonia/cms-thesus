import React from "react";
import styled from "@emotion/styled";
import { THEME } from "components/Theme/const";

const SWrapperPrimary = styled.div`
  border-style: solid;
  border-width: 4px;
  border-image: linear-gradient(to left, #fff, ${THEME.cPrimary}) 100% 0 100% 0/0px
    0 4px 0 stretch;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  margin-bottom: 4px;
`;

const SWrapperSecondary = styled.div`
  border-style: solid;
  border-width: 4px;
  border-image: linear-gradient(to left, #fff, ${THEME.cSecondary}) 100% 0 100%
    0/0px 0 4px 0 stretch;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  margin-bottom: 4px;
`;

const SWrapperSuccess = styled.div`
  border-style: solid;
  border-width: 4px;
  border-image: linear-gradient(to left, #fff, ${THEME.cSuccessMain}) 100% 0
    100% 0/0px 0 4px 0 stretch;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  margin-bottom: 4px;
`;

const SWrapperBlue = styled.div`
  border-style: solid;
  border-width: 4px;
  border-image: linear-gradient(to left, #fff, ${THEME.cBlueMain}) 100% 0 100% 0/0px
    0 4px 0 stretch;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  margin-bottom: 4px;
`;

const STitle = styled.span`
  font-size: 22px;
  text-align: left;
  color: ${THEME.cTextDark};
  vertical-align: middle;
  display: inline;
  margin-right: 10px;
  margin-bottom: 8px;
`;

export const TitlePrimary = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperPrimary width={width} {...props}>
        {icon}
        <STitle>{title}</STitle>
      </SWrapperPrimary>
    </>
  );
};

export const TitleSecondary = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperSecondary width={width} {...props}>
        {icon}
        <STitle>{title}</STitle>
      </SWrapperSecondary>
    </>
  );
};

export const TitleBlue = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperBlue width={width} {...props}>
        {icon} <STitle>{title}</STitle>
      </SWrapperBlue>
    </>
  );
};

export const TitleSuccess = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperSuccess width={width} {...props}>
        {icon} <STitle>{title}</STitle>
      </SWrapperSuccess>
    </>
  );
};
