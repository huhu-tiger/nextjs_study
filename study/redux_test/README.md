# reducer 的函数必须是纯函数
纯函数： 1. 相同的输入，相同的输出，不能修改传入的参数
         2. 不能有副作用，例如网络请求，输入输出设备
         3. 不能调用 Date.now() 或者 Math.random() 等不纯的方法

# redux 开发工具
1. 安装 redux-devtools-extension
```bash
npm install redux-devtools-extension
```
2. 在 store.js 中应用 redux-devtools-extension




## 1. 安装
```bash
npm install redux react-redux @reduxjs/toolkit
```

## 2. 启动
```bash
npm start
```
# redux 精简版本
## 1. 创建store.js
### 1. src 下创建 store.js
 --redux 提供 createStore 函数
 --createStore 函数需要传入一个 reducer 函数
### 2. reducer 函数
     1) reducer 本质是一个函数，接收两个参数：preState 和 action
     preState 是上一次的 state 值
     action 是当前的 action 值
     reducer 函数需要返回新的 state 值
    2) 在 reducer 函数中，需要根据 action 的 type 来决定如何修改 state
    3) reducer 被第一次调用，是store自动调用的，此时 preState 是 undefined
       所以需要给 preState 一个初始值
       传递的action是{type: '@@redux/INIT'}
    4) mapStateToProps 函数 接收 state 值
     mapStateToProps 函数 接收 state 值
     mapDispatchToProps 函数 接收 dispatch 函数

### 3. 在 最上级的index.js 中引入 store.js
     Provider 组件 包裹 App 组件



# redux react-redux 基本使用
 精简版本上添加文件
 1. .contant.js 定义常量,防止写错
 2. 明确两个概念
  1）UI组件：只负责显示，不负责逻辑
  2）容器组件：负责逻辑，不负责显示
 3. 创建一个容器组件，靠 connect 函数将 UI 组件和容器组件连接起来
   connect 函数需要传入两个参数：mapStateToProps 和 mapDispatchToProps
   mapStateToProps: 映射状态到 props，返回值是一个对象
   mapDispatchToProps: 映射 dispatch 到 props，返回值是一个对象
 4. 备注： 容器组件中是store是靠 react-redux 的 Provider 组件传递的

 5. 在 最上级的index.js 中引入 store.js
     Provider 组件 包裹 App 组件, App的所有子组件都可以通过 store 获取状态

# redux 异步
 1. 安装 redux-thunk 中间件
 ```bash
 npm install redux-thunk
 ```
 2. 在 store.js 中应用 redux-thunk 中间件
 


# redux-devtools-extension 使用
1. 安装 redux-devtools-extension
```bash
npm install redux-devtools-extension
```
2. 在 store.js 中应用 redux-devtools-extension
```bash
import { composeWithDevTools } from 'redux-devtools-extension';
```
3. 在 store.js 中应用 redux-devtools-extension
```bash
applyMiddleware(thunk, composeWithDevTools())
```