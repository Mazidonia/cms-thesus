import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  name: null,
  is_admin: false,
  user_id: null,
  isAuthenticated: false,
  isCheckedState: false,
  permissions: null,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    name: action.name,
    is_admin: action.is_admin,
    user_id: action.user_id,
  });
};

const authCheckedState = (state) => {
  return updateObject(state, {
    isCheckedState: true,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    name: null,
    is_admin: false,
    user_id: null,
    isAuthenticated: false,
    isCheckedState: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_CHECKED_STATE:
      return authCheckedState(state, action);
    case actionTypes.LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
