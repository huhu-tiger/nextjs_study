# 照片API测试脚本

本目录包含了用于测试照片API接口的各种脚本。

## 脚本说明

### 1. `test-photo-api.ts` - 完整测试脚本
- **功能**: 全面的API测试，包含所有CRUD操作
- **特点**: 
  - 详细的日志输出
  - 彩色控制台输出
  - 完整的错误处理测试
  - 分页功能测试
  - 搜索功能测试
- **运行方式**: `npm run test-api`

### 2. `quick-test-api.ts` - 快速测试脚本
- **功能**: 简化的API测试，快速验证基本功能
- **特点**:
  - 简洁的输出
  - 基本的CRUD操作测试
  - 适合快速验证
- **运行方式**: `npm run test-api-quick`

### 3. `test-api-curl.sh` - curl测试脚本
- **功能**: 使用curl命令测试API
- **特点**:
  - 不依赖Node.js环境
  - 使用系统curl命令
  - 彩色输出
  - 完整的错误处理测试
- **运行方式**: `npm run test-api-curl`

## 使用方法

### 前提条件
1. 确保Next.js开发服务器正在运行：
   ```bash
   npm run dev
   ```

2. 确保MongoDB数据库已连接并包含测试数据：
   ```bash
   npm run init-data
   ```

### 运行测试

#### 完整测试
```bash
npm run test-api
```

#### 快速测试
```bash
npm run test-api-quick
```

#### curl测试
```bash
npm run test-api-curl
```

## 测试内容

### 1. GET请求测试
- ✅ 查询照片列表
- ✅ 分页功能
- ✅ 搜索功能（按描述）
- ✅ 用户ID过滤
- ✅ 排序功能

### 2. POST请求测试
- ✅ 创建新照片
- ✅ 必填字段验证
- ✅ 数据格式验证

### 3. PUT请求测试
- ✅ 更新照片信息
- ✅ 部分字段更新
- ✅ 不存在的照片ID处理

### 4. DELETE请求测试
- ✅ 软删除（标记删除）
- ✅ 永久删除
- ✅ 不存在的照片ID处理

### 5. 错误处理测试
- ✅ 不支持的HTTP方法
- ✅ 缺少必填字段
- ✅ 无效的照片ID
- ✅ 服务器连接错误

## 测试数据

测试脚本使用以下测试数据：

```typescript
const testUser = {
  _id: '507f1f77bcf86cd799439011',
  name: '测试用户',
  email: 'test@example.com'
};

const testPhotos = [
  {
    desc: '美丽的风景照片',
    userId: testUser._id,
    views: 100
  },
  {
    desc: '城市夜景照片',
    userId: testUser._id,
    views: 200
  },
  {
    desc: '自然风景照片',
    userId: testUser._id,
    views: 150
  }
];
```

## 输出示例

### 成功输出
```
🚀 开始测试照片API接口...
API地址: http://localhost:3000/api/mongo/photos

📸 测试查询照片接口...
✅ 查询照片成功
ℹ️  返回 3 张照片
ℹ️  总数: 3
ℹ️  当前页: 1
ℹ️  总页数: 1

🔍 测试搜索照片接口...
✅ 搜索照片成功
ℹ️  找到 2 张包含"风景"的照片

➕ 测试创建照片接口...
✅ 创建照片成功
ℹ️  照片ID: 507f1f77bcf86cd799439012
ℹ️  描述: API测试创建的照片

🎉 所有测试完成！
```

### 错误输出
```
❌ 查询照片失败: connect ECONNREFUSED 127.0.0.1:3000
ℹ️  请确保Next.js开发服务器正在运行
ℹ️  请运行: npm run dev
```

## 故障排除

### 1. 连接被拒绝
```
❌ 无法连接到服务器，请确保Next.js开发服务器正在运行
```
**解决方案**: 运行 `npm run dev` 启动开发服务器

### 2. 数据库连接错误
```
❌ 查询照片失败: 服务器内部错误
```
**解决方案**: 
1. 检查MongoDB是否运行
2. 运行 `npm run init-data` 初始化数据

### 3. 权限错误（curl脚本）
```
❌ 权限被拒绝
```
**解决方案**: 运行 `chmod +x scripts/test-api-curl.sh`

## 自定义测试

### 修改API地址
在脚本中修改 `API_BASE_URL` 变量：
```typescript
const API_BASE_URL = 'http://your-server:port/api/mongo/photos';
```

### 修改测试数据
在脚本中修改 `testUser` 和 `testPhotos` 变量。

### 添加新的测试用例
在相应的测试函数中添加新的测试逻辑。

## 注意事项

1. **测试数据**: 测试脚本会创建和删除测试数据，请确保在测试环境中运行
2. **并发测试**: 避免同时运行多个测试脚本
3. **网络延迟**: 测试脚本包含延迟，避免请求过于频繁
4. **错误处理**: 所有脚本都包含完整的错误处理机制
