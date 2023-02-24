import { QueryClient, useMutation } from "react-query";
import axios from "./config-axios";
import { getJwtToken } from "libs/auth";
import { LS_JWT_TOKEN_KEY, ENDPOINTS } from "./const";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      //staleTime: 2000,
    },
  },
});

export async function mutationFn({ body, method = "post", path }) {
  const res = await axios({
    method: method,
    url: path,
    data: body,
  });

  return res.data;
}

export function useCustomMutation(options) {
  return useMutation({ mutationFn, ...options });
}

export async function fetchRefreshToken() {
  try {
    const { access_token, refresh_token } = getJwtToken();

    const res = await axios.post(ENDPOINTS.renewAccessToken, {
      access_token,
      refresh_token,
    });

    localStorage.setItem(LS_JWT_TOKEN_KEY, res?.data?.accessToken);
    return true;
  } catch {
    return false;
  }
}
