import { config as appConfig, axiosConfig } from "@/config";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// import { track } from '@vercel/analytics';
import useCommonStore from "@/stores/store";

// Extend the Axios config type to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: number };
}

const http = axios.create({
  baseURL: appConfig.baseURL,
  timeout: axiosConfig.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
  const phoneCode = useCommonStore.getState().phoneCode;

  if (phoneCode.phone_code !== "88") {
    // set the baseURL to the international baseURL
    config.baseURL = appConfig.internationalBaseURL;
    //  console.log('using international baseURL', config.baseURL);
  }
  config.headers["Platform"] = "WEB";
  // Add timestamp for response time tracking
  config.metadata = { startTime: Date.now() };
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default http;
