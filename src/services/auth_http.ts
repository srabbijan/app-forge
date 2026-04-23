import { config as appConfig, axiosConfig } from "@/config";
import getToken from "@/lib/getToken";
import useCommonStore from "@/stores/store";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Extend the Axios config type to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: number };
}

const auth_http = axios.create({
  baseURL: appConfig.baseURL,
  timeout: axiosConfig.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

auth_http.interceptors.request.use(
  async (config: ExtendedAxiosRequestConfig) => {
    const user = useCommonStore.getState().user;
    const countryCode = user?.country_code;
    const isOffline = navigator.onLine === false;

    // Allow GET requests to proceed even when offline - service worker will serve from cache
    // Only block non-GET requests (POST, PUT, DELETE) when offline to prevent data loss
    const isGetRequest = (config.method?.toLowerCase() || "get") === "get";
    if ((isOffline || !navigator.onLine) && !isGetRequest) {
      const offlineError = new Error(
        "You are offline. Please check your internet connection.",
      );
      offlineError.name = "OfflineError";
      return Promise.reject(offlineError);
    }

    if (countryCode !== "88") {
      // set the baseURL to the international baseURL
      config.baseURL = appConfig.internationalBaseURL;
    }

    config.headers["Platform"] = "WEB";
    const token = await getToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    // Add timestamp for response time tracking
    config.metadata = {
      startTime: Date.now(),
    } as ExtendedAxiosRequestConfig["metadata"];
    return config;
  },
);

auth_http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError | Error) => {
    // Calculate response time for errors (if available)
    const responseTime =
      Date.now() -
      ((error as AxiosError).config
        ? ((error as AxiosError).config as ExtendedAxiosRequestConfig)?.metadata
            ?.startTime || 0
        : 0);

    // Handle offline errors from request interceptor (custom OfflineError)
    if (
      (error as Error).name === "OfflineError" ||
      error.message ===
        "You are offline. Please check your internet connection."
    ) {
      // Do NOT send this to Sentry to avoid noisy offline warnings
      return Promise.reject(error);
    }

    if ((error as AxiosError).response?.status === 401) {
      const store = await import("@/stores/store");
      store.useCommonStore.getState().logout();
      return Promise.reject(error);
    }

    // handle other errors
    return Promise.reject(error);
  },
);

export default auth_http;
