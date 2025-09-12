# API 配置说明

## 方案一：通过Vite代理配置（推荐）

### 1. 修改 vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://172.22.220.21:3001', // 修改这里的地址
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### 2. 修改代码中的API调用
将硬编码的完整URL改为相对路径：

**修改前：**
```typescript
const baseurl = "http://172.22.220.21:3001/api/photos/advanced";
```

**修改后：**
```typescript
const baseurl = "/api/photos/advanced";
```

### 3. 环境切换
- **开发环境**: 修改 `vite.config.ts` 中的 `target` 值
- **生产环境**: 构建后的应用会直接使用相对路径

## 方案二：使用环境变量

### 1. 创建环境变量文件
在项目根目录创建 `.env.local` 文件：
```bash
VITE_API_BASE_URL=http://172.22.220.21:3001
```

### 2. 修改代码使用环境变量
```typescript
const baseurl = `${import.meta.env.VITE_API_BASE_URL}/api/photos/advanced`;
```

### 3. 不同环境的配置
- `.env.local` - 本地开发环境
- `.env.development` - 开发环境
- `.env.production` - 生产环境

## 方案三：使用配置文件

### 1. 使用 api-config.json
```typescript
import apiConfig from '../config/api-config.json';

const env = import.meta.env.MODE || 'development';
const config = apiConfig[env];
const baseurl = `${config.baseUrl}${config.endpoints.photosAdvanced}`;
```

## 推荐使用方案一（Vite代理）

**优点：**
- 不需要修改现有代码
- 开发和生产环境统一
- 支持热重载
- 自动处理跨域问题

**使用步骤：**
1. 修改 `vite.config.ts` 中的 `target` 地址
2. 将代码中的完整URL改为相对路径（如：`/api/photos/advanced`）
3. 重启开发服务器

**环境切换：**
- 开发环境：修改 `vite.config.ts`
- 生产环境：配置Web服务器代理或使用相对路径
