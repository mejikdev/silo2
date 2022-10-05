import { parse, serialize } from "cookie";

export const getAllCookie = () => {
  if (typeof document === "undefined") {
    return;
  }

  const cookies = parse(document.cookie);

  return cookies;
};

export const getCookie = (key) => {
  const cookies = getAllCookie();

  if (!cookies) {
    return "";
  }

  return cookies[key];
};

export const setCookie = (key, value) => {
  const serializedCookie = serialize(key, value, {
    path: "/",
    // secure: process.env.NODE_ENV !== "development",
    // sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
  });

  document.cookie = serializedCookie;

  return value;
};
