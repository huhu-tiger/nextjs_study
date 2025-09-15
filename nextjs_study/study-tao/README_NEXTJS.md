# Study-Tao Next.js 项目

这是一个使用 Next.js 14 构建的学习项目，复制了 vite-project 的功能和布局，使用 Next.js 的路由系统。

## 技术栈

- **框架**: Next.js 14.2.28
- **UI 库**: Chakra UI 2
- **样式**: Tailwind CSS 3.4.1
- **状态管理**: Zustand 4.3.5
- **数据查询**: TanStack Query 4.41.0
- **语言**: TypeScript 5.8.3

## 项目结构

```
src/
├── components/
│   └── Layout.tsx          # 主布局组件
├── pages/                  # Next.js 页面路由
│   ├── _app.tsx           # 全局应用配置
│   ├── index.tsx          # 首页
│   ├── about/             # 关于页面
│   │   ├── team.tsx
│   │   └── history.tsx
│   ├── products/          # 产品页面
│   │   ├── software.tsx
│   │   └── services.tsx
│   ├── contact/           # 联系页面
│   │   ├── support.tsx
│   │   └── feedback.tsx
│   ├── table/             # 表格页面
│   │   ├── simpletable.tsx
│   │   └── advancedtable.tsx
│   ├── study/             # 学习页面
│   │   ├── miaobiao.tsx
│   │   ├── jisuan.tsx
│   │   ├── todo.tsx
│   │   ├── todo_reducer.tsx
│   │   └── todo_context.tsx
│   ├── transferstate/     # 组件通信页面
│   │   ├── contextuse.tsx
│   │   ├── zustanddemo.tsx
│   │   ├── zustandtable.tsx
│   │   ├── zustandimmer.tsx
│   │   └── zustandstore.tsx
│   └── tankquery/         # 数据查询页面
│       ├── tankquerybase.tsx
│       └── tankqueryadvancedtable.tsx
└── styles/
    └── globals.css        # 全局样式
```

## 功能特性

### 1. 布局系统
- 响应式网格布局
- 侧边栏导航菜单
- 面包屑导航
- 自动菜单展开/收起

### 2. 学习模块
- **秒表**: 使用 useRef 和 useState 实现计时器
- **计算器**: 使用 useMemo 优化计算性能
- **Todo 应用**: 多种实现方式
  - 基础 useState 版本
  - useReducer 版本
  - useContext 版本

### 3. 组件通信
- **useContext**: React 内置上下文 API
- **Zustand**: 轻量级状态管理
- **Zustand + Immer**: 不可变状态更新
- **复杂 Store**: 包含持久化和开发工具

### 4. 数据查询
- **TanStack Query**: 数据获取和缓存
- **基础查询**: 简单的数据获取示例
- **高级表格**: 结合搜索、排序、分页的数据展示

### 5. 表格功能
- **简单表格**: 基础数据展示
- **高级表格**: 搜索、排序、分页、操作按钮

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 主要特性

1. **Next.js 路由**: 使用文件系统路由，自动生成路由
2. **Chakra UI**: 现代化的 UI 组件库
3. **TypeScript**: 完整的类型安全
4. **响应式设计**: 适配不同屏幕尺寸
5. **状态管理**: 多种状态管理方案对比
6. **数据获取**: 现代化的数据获取和缓存策略

## 与原项目的区别

- 使用 Next.js 替代 Vite + React Router
- 文件系统路由替代手动路由配置
- 保持了相同的 UI 和功能
- 优化了代码结构和类型安全

## 学习重点

1. **React Hooks**: useState, useEffect, useRef, useMemo, useContext, useReducer
2. **状态管理**: 不同状态管理方案的对比
3. **数据获取**: TanStack Query 的使用
4. **UI 组件**: Chakra UI 组件库的使用
5. **Next.js**: 服务端渲染和静态生成
6. **TypeScript**: 类型定义和类型安全
