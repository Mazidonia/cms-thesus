import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchDataUser } from "./useFetch";

import { setUser, authFail } from "store/slices/authSlice";

function useGetUser() {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const { res, isError, isFetching } = useFetchDataUser(
    "ENDPOINTS.user",
    isAuthenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (isError) {
      dispatch(authFail());
    } else if (res) {
      dispatch(setUser({ name: res?.name }));
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [isError, isAuthenticated, res]);

  return isFetching;
}

export default useGetUser;
