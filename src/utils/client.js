const axios = require('axios');
import axiosRetry from 'axios-retry';

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/UADACID/fake-api',
  timeout: 5000,
});

axiosRetry(instance, {retries: 3});

export default instance;
