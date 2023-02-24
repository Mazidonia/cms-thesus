import { THEME } from "libs/styles/const";
import { css } from "@emotion/react";

export const STYLES_GLOBAL = css`
  :root {
  }

  body {
    width: 100%;
    height: 100vh;
    font-family: "Kanit", "sans-serif";
    font-size: 16px;
    font-weight: 300;
    //background: ${THEME.cPrimary};
    box-sizing: border-box;
  }

  #__next {
    height: 100vh;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    appearance: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }

  a,
  button {
    color: inherit;
  }

  :focus:not(:focus-visible) {
    outline: none !important;
  }

  .react-datepicker__header {
    background: transparent !important;
  }

  .react-datepicker {
    border: none !important;
  }

  .react-datepicker-popper {
    z-index: 4 !important;
  }

  .react-datepicker__day {
    color: #1a141f !important;
  }

  .react-datepicker__day--selected {
    background-color: #1696e7 !important;
    color: #ffffff !important;
  }

  .react-datepicker__day-name .react-datepicker__day {
    width: 2rem !important;
  }
  .react-datepicker__day--outside-month {
    color: #aba7af !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #bad9f1 !important;
  }

  .react-datepicker__month-text--keyboard-selected {
    background-color: #1696e7 !important;
  }

  .react-datepicker__year-text--selected {
    background-color: #1696e7 !important;
  }

  .react-datepicker__year-wrapper {
    max-width: 228px !important;
  }

  .react-datepicker__year-text {
    line-height: 2.8rem;
    width: 4.5rem !important;
    font-size: 14px !important;
    font-family: Kanit !important;
  }

  .react-datepicker__month
    .react-datepicker__month-text
    .react-datepicker__month-wrapper {
    max-width: 228px !important;
  }
  .react-datepicker__month-text {
    width: 4.5rem !important;
    line-height: 2.8rem;
    font-size: 14px !important;
    font-family: Kanit !important;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
