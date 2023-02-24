import Qs from 'qs';
import moment from 'moment';
import axios from 'axios';
import { ParamsSerializerOptions } from 'axios';


const paramsSerializer = (params: string) => (
  Qs.stringify(params, {
    arrayFormat: 'brackets',
    filter: (prefix, value: any) => {
      if (moment.isMoment(value) || value instanceof Date) 
        return value.toISOString();

      return value;
  }}) as ParamsSerializerOptions
);   


/*const axiosInstance = axios.create({
  baseURL: process.env.HOST_API_KEY || '',
  paramsSerializer : (params) => (
    Qs.stringify(params, {
      arrayFormat: 'brackets',
      filter: (prefix, value: any) => {
        if (moment.isMoment(value) || value instanceof Date) 
          return value.toISOString();
        return value;
    }}) as ParamsSerializerOptions
  )
});*/

const axiosInstance = axios.create({ baseURL: process.env.HOST_API_KEY || '' });

axiosInstance.interceptors.request.use(
  async function (options: any) {
    const token = "";

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return options;
  },
  function (error: string) {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

