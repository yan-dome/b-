// 所有类目列表的接口
import axios from '@/axios';

export default {
  list(params) {
    return axios.get('/category/all', { params });
  },
};
