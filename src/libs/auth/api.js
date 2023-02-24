import { getJwtToken } from "./index";
import axios from "../../config/axios";

export async function authCheckState() {
  try {
    const { refresh_token } = getJwtToken();
    const res = await axios.get("user/auth/auth-check-state", {
      headers: { "REFRESH-TOKEN": refresh_token },
    });
    const { accessToken } = res.data;
    return accessToken;
  } catch {
    return false;
  }
}
