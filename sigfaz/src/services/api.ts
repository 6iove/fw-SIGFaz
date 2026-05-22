import axios from 'axios';

const apiSigfaz = axios.create({
  baseURL: '/',
});

export default apiSigfaz;