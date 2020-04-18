import axios from 'axios';
import { getSessionCookie } from './session'
import { useState, useEffect } from 'react';

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

export const useResource = (resourceName) => {
  const [resource, setResource] = useState(null);
  useEffect(() => {
    const getResource = async () => {
      try {
        const req = await request.get(`${resourceName}`);
        
        setResource(req.data)
      } catch (e) {
        console.log("Failed to get resource");        
      } 
    }

    getResource();
  }, [resourceName])

  return resource
}

export default request;