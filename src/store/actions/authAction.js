import axios from "libs/api/config-axios";
import * as actionTypes from "./actionTypes";

import { ENDPOINTS } from "libs/api/const";

export const authSuccess = (name, user_id, is_admin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    name,
    user_id,
    is_admin,
  };
};

export const authCheckedState = () => {
  return {
    type: actionTypes.AUTH_CHECKED_STATE,
  };
};

export const logout = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("user_id");
  localStorage.removeItem("sidebar_min");
  return {
    type: actionTypes.LOGOUT,
  };
};

export const auth = (objData) => {
  return (dispatch) => {
    try {
      const { name, user_id, is_admin } = objData;
      localStorage.setItem("name", name);
      //localStorage.setItem("is_admin", is_admin);
      localStorage.setItem("user_id", user_id[0]);
      dispatch(authSuccess(name, user_id[0], is_admin));
    } catch (err) {
      console.log(err);
    }
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) {
        dispatch(logout());
      } else {
        const [res, resUserInfo] = await Promise.all([
          axios.post(ENDPOINTS.checkAuth, {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
              user: [
                [["id", "=", [+user_id]]],
                ["id", "name", "login", "employee_ids"],
              ],
              employee: ["name", "mobile_phone"],
              kwargs: {
                limit: 1,
                offset: 0,
              },
            },
          }),
          axios.post(ENDPOINTS.group, {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
              full_name: "Inventory / Administrator",
              users: +user_id,
            },
          }),
        ]);
        if (res.data?.error) {
          dispatch(logout());
        } else {
          const userInfo = res.data?.result[1][0];

          setTimeout(() => {
            dispatch(
              authSuccess(
                userInfo?.name,
                userInfo?.id,
                resUserInfo?.data?.result
              )
            );
            dispatch(authCheckedState());
          }, 500);
        }
      }
    } catch (error) {
      dispatch(logout());
    }
  };
};
