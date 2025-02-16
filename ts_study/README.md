1. 基础使用
  1. 安装typescript
    npm install -g typescript

  2. 检查版本
    tsc -v

  3. 初始化typescript项目
    tsc --init

  4. 编译typescript文件
    tsc 文件名.ts
    4.1 简易编译
      ts-node 文件名.ts

  5. 运行typescript文件
    node 文件名.js

  6. 安装vscode 插件 code runner 
    npm install -g ts-node

  7. 安装rollup
    npm install -D rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve 
  8. tsconfig.json 配置
    "module": "ESNext", // 指定模块类型 !!!!
    "target": "ES2016", // 指定目标版本
    "lib": ["ESNext", "DOM"], // 指定库,不必须，可能需要根据项目需求配置
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./src", // 指定根目录
    "strict": true, // 启用严格模式
    "sourceMap": true, // 生成sourcemap !!!

  9. npm run dev 运行
  10. dist/index.html 打开浏览器运行