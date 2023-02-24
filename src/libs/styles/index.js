import { THEME } from "./const";
import { css } from "@emotion/react";
/** Get CSS custom property */
export function getCss(key) {
  return `${THEME[key]}`;
}

export const TOAST_OPTIONS = {
  error: {
    duration: 6500,
    style: { backgroundColor: getCss("cDangerMain"), color: getCss("cWhite") },
  },
  success: {
    duration: 4000,
    style: { backgroundColor: getCss("cSuccessMain"), color: getCss("cWhite") },
  },
};

export const STYLES_GLOBAL = css`
  body {
    min-height: 100vh;
    //color: ${getCss("cText")};
    font-family: var(--font-reg);
    font-size: 16px;
    font-weight: 400;
    //background-color: ${getCss("cWhite")};
    box-sizing: border-box;

    @font-face {
      font-family: "roboto-light";
      font-display: swap;
      src: url("/static/fonts/Roboto-Light.ttf") format("truetype");
    }

    @font-face {
      font-family: "roboto-reg";
      font-display: swap;
      src: url("/static/fonts/Roboto-Regular.ttf") format("truetype");
    }

    @font-face {
      font-family: "roboto-bold";
      font-display: swap;
      src: url("/static/fonts/Roboto-Bold.ttf") format("truetype");
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  a:active {
    text-decoration: none;
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

  :focus {
    outline-offset: -2px !important;
    outline-width: 2px !important;
    outline-style: double !important;
    outline-color: rgb(0, 95, 204) !important;
  }

  :focus-visible,
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
