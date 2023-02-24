import React from "react";
import styled from "@emotion/styled";
import { THEME } from "../../Theme/const";

const SWrapperPrimary = styled.div`
  width: 100%;
  margin-bottom: 4px;
  background: linear-gradient(to left, ${THEME.cWhite}, 35%, ${THEME.cPrimary});
  padding: 4px;
  border-radius: 4px;
  color: ${THEME.cWhite};
`;

const SWrapperSecondary = styled.div`
  width: 100%;
  margin-bottom: 4px;
  background: linear-gradient(
    to left,
    ${THEME.cWhite},
    35%,
    ${THEME.cSecondary}
  );
  padding: 4px;
  border-radius: 4px;
  color: ${THEME.cWhite};
`;

const SWrapperSuccess = styled.div`
  width: 100%;
  margin-bottom: 4px;
  background: linear-gradient(
    to left,
    ${THEME.cWhite},
    35%,
    ${THEME.cSuccessDark}
  );
  padding: 4px;
  border-radius: 4px;
  color: ${THEME.cWhite};
`;

const SWrapperBlue = styled.div`
  width: 100%;
  margin-bottom: 4px;
  background: linear-gradient(
    to left,
    ${THEME.cWhite},
    35%,
    ${THEME.cBlueDark}
  );
  padding: 4px;
  border-radius: 4px;
  color: ${THEME.cWhite};
`;

const STitle = styled.span`
  font-size: 18px;
  text-align: left;
  vertical-align: middle;
  display: inline;
  margin-right: 10px;
  margin-left: 4px;
  font-weight: 700;
`;

const SWrapperDanger = styled.div`
  width: 100%;
  margin-bottom: 4px;
  background: linear-gradient(
    to left,
    ${THEME.cWhite},
    35%,
    ${THEME.cDangerDark}
  );
  padding: 4px;
  border-radius: 4px;
  color: ${THEME.cWhite};
`;

export const TitlePrimaryBG = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperPrimary width={width} {...props}>
        {icon}
        <STitle>{title}</STitle>
      </SWrapperPrimary>
    </>
  );
};

export const TitleSecondaryBG = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperSecondary width={width} {...props}>
        {icon}
        <STitle>{title}</STitle>
      </SWrapperSecondary>
    </>
  );
};

export const TitleBlueBG = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperBlue width={width} {...props}>
        {icon} <STitle>{title}</STitle>
      </SWrapperBlue>
    </>
  );
};

export const TitleSuccessBG = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperSuccess width={width} {...props}>
        {icon} <STitle>{title}</STitle>
      </SWrapperSuccess>
    </>
  );
};

export const TitleDangerBG = ({ title, width, icon, ...props }) => {
  return (
    <>
      <SWrapperDanger width={width} {...props}>
        {icon} <STitle>{title}</STitle>
      </SWrapperDanger>
    </>
  );
};
