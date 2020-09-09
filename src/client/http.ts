import axios from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { host },
} = getConfig();

export const request = axios.create({
  baseURL: process.browser ? window.location.origin : host,
});

// Keep this one here for the moment

// Add a response interceptor
// request.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === httpStatusCode.UNAUTHORIZED) {
//       // TODO: route to /login page
//     }
//     if (error.response.status >= 500) {
//       // TODO: Dispatch generic error message
//     }

//     // Otherwise, errors should be handled by the caller

//     return Promise.reject(error);
//   },
// );
