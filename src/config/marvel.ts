import axios from 'axios';

const apiMarvel = axios.create({
  baseURL: process.env.APP_API_MARVEL_URL,
  params: { ts: process.env.MARVEL_TS, apikey: process.env.MARVEL_API_KEY },
});

export default apiMarvel;
