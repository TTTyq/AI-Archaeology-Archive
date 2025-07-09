import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      // 服务器响应了错误状态码
      throw new Error(error.response.data?.error || error.response.data?.message || 'Server error');
    } else if (error.request) {
      // 请求发出但没有收到响应
      throw new Error('Network error - please check your connection');
    } else {
      // 其他错误
      throw new Error(error.message || 'Unknown error occurred');
    }
  }
);

// API方法
export const artifactAPI = {
  // 获取所有考古文物
  getAll: (params = {}) => api.get('/artifacts', { params }),
  
  // 获取单个考古文物
  getById: (id) => api.get(`/artifacts/${id}`),
  
  // 创建新的考古文物
  create: (data) => api.post('/artifacts', data),
  
  // 更新考古文物
  update: (id, data) => api.put(`/artifacts/${id}`, data),
  
  // 删除考古文物
  delete: (id) => api.delete(`/artifacts/${id}`),
  
  // 获取统计信息
  getStats: () => api.get('/artifacts/stats/overview'),
};

// 健康检查
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
