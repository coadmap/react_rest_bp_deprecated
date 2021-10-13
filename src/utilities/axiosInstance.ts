import axios, { AxiosRequestConfig, AxiosTransformer } from "axios";
import humps from "humps";

export const HttpClient = axios.create({
  transformResponse: [
    ...((axios.defaults.transformResponse as AxiosTransformer[]) || []),
    (data) => humps.camelizeKeys(data),
  ],
});

HttpClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };

  if (config.params) {
    newConfig.params = humps.decamelizeKeys(config.params);
  }
  if (config.data) {
    newConfig.data = humps.decamelizeKeys(config.data);
  }
  return newConfig;
});

const token = localStorage.getItem("GULLIVER_WORKS_AUTH_TOKEN");

if (token) {
  HttpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// https://ryotarch.com/javascript/react/swr-axios-typescript/
