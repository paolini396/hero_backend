import axios from 'axios';

const apiMarvel = axios.create({
  baseURL: process.env.APP_API_MARVEL_URL,
});

export default apiMarvel;
