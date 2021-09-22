// 获取产品列表接口
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
  add(params) {
    return axios.post('/products/add', params);
  },
  detail(id) {
    return axios.get(`/products/${id}`);
  },
  edio(params) {
    return axios.put('/products/edit', params);
  },
};
