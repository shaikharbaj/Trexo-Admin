import axios, { AxiosInstance } from "axios";

const PILOT_BASE_URL: string = process.env.PILOT_BASE_URL as string;
const API_BASE_URL: string = process.env.API_BASE_URL as string;

const pilotClient: AxiosInstance = axios.create({
  baseURL: PILOT_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const publicClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

publicClient.interceptors.request.use(
  (config) => {
    // Check if the request data is FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const privateClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

privateClient.interceptors.request.use(
  (config) => {
    const token = "demo-token-from-cookie";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Check if the request data is FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);

export { pilotClient, publicClient, privateClient };
