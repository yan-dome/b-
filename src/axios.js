// 引入axios
import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
instance.interceptors.request.use((config) => {
  // console.log('这是请求打印', config);
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (error) => Promise.reject(error));
instance.interceptors.response.use((response) => {
  // console.log('这是响应打印', response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  // console.log(response.data.data);
  return response.data.data;
}, (error) => Promise.reject(error));
export default instance;
