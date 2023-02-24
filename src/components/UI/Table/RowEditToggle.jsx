import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { THEME } from "libs/styles/const";

const SRowToggler = styled.button`
  border: 1px solid ${THEME.cPrimary};
  border-radius: 3.75px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s opacity ease-out;
  background-color: ${THEME.cWhite};
  display: inline-block;
  vertical-align: middle;
  padding: 5px;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;

const SChevron = styled.div`
  width: 0;
  height: 0;
  border-left: 4.5px solid transparent;
  border-right: 4.5px solid transparent;
  border-bottom: 6.75px solid ${THEME.cPrimary};
  &.active {
    transform: rotate(180deg);
  }
`;

const EditToggle = (props) => {
  const { isToggled, togglerFn } = props;
  return (
    <SRowToggler
      type="button"
      onClick={() => {
        togglerFn((prev) => !prev);
      }}
    >
      <SChevron alt="toggler" className={isToggled ? "active" : ""} />
    </SRowToggler>
  );
};

EditToggle.propTypes = {
  isToggled: PropTypes.bool,
  togglerFn: PropTypes.func,
};

export default EditToggle;
