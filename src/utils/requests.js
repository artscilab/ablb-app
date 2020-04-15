import axios from 'axios';
import { getSessionCookie } from './session'

const request = axios.create({
  baseURL: window.location.protocol + "//" + window.location.hostname + ":8000/api",
})

request.interceptors.request.use(function (config) {
  const user = getSessionCookie();
  
  if (user !== null) {
    config.headers = {
      ...config.headers, 
      "authorization": `Bearer ${user.token}`
    }
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default request;