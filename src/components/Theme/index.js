import shadows from "./shadows";
import typography from "./typography";
import { THEME } from "./const";

export const theme = {
  root: {
    "&.Mui-selected": {
      margin: 8,
    },
  },
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          border: "1px solid #aeaeae",
          borderRadius: "0.3rem",
        },
      },
    },
    // MuiYearPicker: {
    //   styleOverrides: {
    //     root: {
    //       margin: 8,
    //     },
    //   },
    // },
    // MuiYearPicker: {
    //   styleOverrides: {
    //     root: {
    //       padding: 25,
    //     },
    //   },
    // },
  },
  palette: {
    background: {
      default: THEME.cBackground,
      paper: THEME.cWhite,
    },
    primary: {
      contrastText: THEME.cWhite,
      main: THEME.cPrimary,
    },
    secondary: {
      main: THEME.cSecondary,
    },
    text: {
      primary: THEME.cTextPrimary,
      secondary: THEME.cTextSecondary,
    },
    footer: { bg: "#393e46", text: THEME.cTextGrey },
    error: {
      light: THEME.cErrorLight,
      main: THEME.cErrorMain,
      dark: THEME.cErrorDark,
      contrastText: THEME.cWhite,
    },
    success: {
      light: THEME.cSuccessLight,
      main: THEME.cSuccessMain,
      dark: THEME.cSuccessDark,
      contrastText: THEME.cWhite,
    },
    warning: {
      light: THEME.cWarningLight,
      main: THEME.cWarningMain,
      dark: THEME.cWarningDark,
      contrastText: THEME.cWhite,
    },
    danger: {
      light: THEME.cDangerLight,
      main: THEME.cDangerMain,
      dark: THEME.cDangerDark,
      contrastText: THEME.cWhite,
    },
    action: {
      selected: THEME.cSelected,
    },
  },
  shadows,
  typography,
};
