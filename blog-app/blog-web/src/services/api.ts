import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    // baseURL: 'http://192.168.0.101:3333/api',
    // baseURL: `${window.location.origin}/api`,
    // baseURL: 'http://18.192.13.191:3333',
  }),
  {
    ignoreHeaders: true,
    caseMiddleware: {
      requestTransformer: (d) => d,
      requestInterceptor: (config) => config,
    },
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error?.response) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        response: {
          data: {
            data: null,
            message: 'Cannot connect with the server',
          },
        },
      });
    }
    return Promise.reject(error);
  },
);

export function setToken(token: string | null): void {
  const parsed = token ? `bearer ${token}` : token;
  // to set token in headers like in postman we set authorization token in Headers
  api.defaults.headers.Authorization = parsed;
}

export default api;