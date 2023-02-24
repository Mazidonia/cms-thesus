import React from "react";
import styled from "@emotion/styled";

const STitleWrapper = styled.div`
  border-style: solid;
  border-width: 4px;
  border-image: linear-gradient(to left, #fff, #031a7f) 100% 0 100% 0/0px 0 4px
    0 stretch;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  margin-bottom: 4px;
`;

const STitle = styled.span`
  font-size: 16px;
  text-align: left;
  color: #333333;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 4px;
`;

export const TitleDivider = ({ title, width, ...props }) => {
  return (
    <>
      <STitleWrapper width={width} {...props}>
        <STitle>{title}</STitle>
      </STitleWrapper>
    </>
  );
};
