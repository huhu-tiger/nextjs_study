// API配置
export const API_CONFIG = {
  // 开发环境使用相对路径，生产环境可以配置完整URL
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-api-domain.com' 
    : '/api',
  
  // 获取完整的API URL
  getUrl: (endpoint: string) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }
};

export default API_CONFIG;

export const PhotoAdvancedUrl = "/api/photos/advanced"
export const PhotoUrl = "/api/photos"





