import { useEffect, useState } from "react";
import { fetchRefreshToken } from "libs/api";
import { useDispatch } from "react-redux";
import useGetUser from "./user";
import { authSuccess } from "store/slices/authSlice";
import {
  LS_JWT_TOKEN_KEY,
  LS_JWT_REFRESH_KEY,
  LS_STUDENT_INFO,
} from "libs/api/const";

export function logOut(reload) {
  localStorage.removeItem(LS_JWT_TOKEN_KEY);
  localStorage.removeItem(LS_JWT_REFRESH_KEY);
  localStorage.removeItem(LS_STUDENT_INFO);

  if (reload) {
    window.location.reload();
  }
}

export function getJwtToken() {
  const access_token = localStorage.getItem(LS_JWT_TOKEN_KEY);
  const refresh_token = localStorage.getItem(LS_JWT_REFRESH_KEY);

  return {
    access_token,
    refresh_token,
    isLoggedIn: Boolean(access_token && refresh_token),
  };
}

function useAuth() {
  const [isReady, setIsReady] = useState(false);
  const isLoading = useGetUser();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("verifyAuthToken");
    async function verifyAuthToken() {
      if (getJwtToken().isLoggedIn) {
        await fetchRefreshToken().then((isSuccess) => {
          if (isSuccess) {
            dispatch(authSuccess());
          } else {
            logOut(true);
          }
        });
      }
      setIsReady(true);
    }

    verifyAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isReady && !isLoading;
}

export default useAuth;
