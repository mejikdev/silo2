import Axios from "axios";

import { getCookie } from "../utils/cookie";

export const axios = Axios.create({
  baseURL: "/api",
});

(() => {
  if (typeof window === "undefined" && typeof document === "undefined") return;

  const token = getCookie("token") ?? "";

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
})();
