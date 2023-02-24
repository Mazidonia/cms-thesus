import * as actionTypes from "./actionTypes";

export const toggleSidebar = (sidebarCollapsed) => {
  return {
    type: actionTypes.TOGGLE_SIDEBAR,
    payload: sidebarCollapsed,
  };
};

export const count = (count) => {
  return {
    type: actionTypes.COUNT,
    payload: count,
  };
};
