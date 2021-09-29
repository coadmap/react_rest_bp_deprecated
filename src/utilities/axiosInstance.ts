import axios, { AxiosRequestConfig, AxiosTransformer } from "axios";
import humps from "humps";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const HttpClient = axios.create({
  headers: {'Access-Control-Allow-Origin': "*"},
  transformResponse: [
    ...((axios.defaults.transformResponse as AxiosTransformer[]) || []),
    (data) => {
      return humps.camelizeKeys(data);
    }
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
  HttpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// https://ryotarch.com/javascript/react/swr-axios-typescript/
