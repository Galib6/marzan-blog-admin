import { Env } from '.environments';
import { IBaseResponse } from '@base/interfaces';
import { getNotificationInstance } from '@lib/utils';
import { useSignOut } from '@modules/auth/lib/hooks';
import { getAuthToken } from '@modules/auth/lib/utils/client';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Axios Instance
export const AxiosInstance = axios.create({
  baseURL: Env.apiUrl,
  headers: {
    'Time-Zone-Offset': -new Date().getTimezoneOffset(),
  },
});

AxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<IBaseResponse>) => {
    const notification = getNotificationInstance();

    if (error.response?.data?.errorMessages.length) {
      error?.response?.data?.errorMessages.forEach((item) => {
        notification.error({
          message: item || error.response?.statusText,
        });
      });
    }

    return error.response;
  },
);

// Axios Instance (Secure)
export const AxiosSecureInstance = axios.create({
  ...AxiosInstance.defaults,
  headers: {
    ...AxiosInstance.defaults.headers,
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

AxiosSecureInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

AxiosSecureInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<IBaseResponse>) => {
    const notification = getNotificationInstance();

    if ([401].includes(error.response?.status)) {
      if (error.response?.data?.errorMessages.length) {
        error?.response?.data?.errorMessages.forEach((item) => {
          notification.error({
            message: item || error.response?.statusText,
          });
        });
      }

      useSignOut();
    } else {
      notification.error({
        message: error.response?.data?.errorMessages || error.message,
      });
    }

    return error.response;
  },
);
