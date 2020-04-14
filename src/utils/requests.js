import axios from 'axios';

const request = axios.create({
  baseURL: window.location.protocol + "//" + window.location.hostname + ":8000/api",
  timeout: 1000,
})

export default request;