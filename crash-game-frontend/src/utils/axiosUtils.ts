import axios, { AxiosRequestConfig } from "axios";

const accessKey = "accessToken";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACK_URL || "http://localhost:4000"}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["X-TIMEZONE"] = -new Date().getTimezoneOffset() / 60;
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);

export const axiosPost = async (
  args: string | [string, AxiosRequestConfig]
) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.post(
    url,
    config?.data
    //    {
    //   withCredentials: true,
    // }
  );

  return res.data;
};

export const axiosGet = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const getAccessToken = (): string => {
  if (window) {
    const token = localStorage.getItem(accessKey);
    return token || "";
  }
  return "";
};

export const setAccessToken = (token: string): void => {
  if (window && token !== "") {
    localStorage.setItem(accessKey, token);
  }
};

export const removeAllTokens = (): void => {
  if (window) {
    localStorage.removeItem(accessKey);
  }
};
