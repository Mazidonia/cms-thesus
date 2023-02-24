import axios from "axios";
import env from "../env";
import { fetchRefreshToken } from "libs/api";
import { getJwtToken } from "libs/auth";
import { ENDPOINTS } from "libs/api/const";
//http://localhost:4000/api/v1/student-thesis/
//https://coursess.pcru.ac.th/api-courses/api/v1/student-thesis/
let instance = axios.create({
  baseURL: env.API || "http://localhost:4000/api/v2/api-cms-thesis/",
  timeout: 10000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const { access_token } = getJwtToken();
    config.headers["access_token"] = `${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;

    if (error.response) {
      if (
        error.response.status === 401 &&
        originalRequest.url === ENDPOINTS.renewAccessToken
      ) {
        // TO DO dispatch logout
        return Promise.reject(error?.response?.data);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const res = await fetchRefreshToken();
        if (res) {
          const { access_token } = getJwtToken();
          instance.defaults.headers.common["access_token"] = `${access_token}`;
          return Promise.resolve(instance(originalRequest));
        } else {
          // TO DO dispatch logout
          return Promise.reject(error?.response?.data);
        }
      }
    }
    return Promise.reject(error?.response?.data);
  }
);

export default instance;
