# React生命周期(旧)

## 1. 生命周期流程图
![react生命周期(旧)](./images/react生命周期(旧).png)

## 2. 生命周期三个阶段
### 初始化阶段
1. `constructor()`: 构造函数
   - 初始化state
   - 绑定事件处理函数的this指向
   
2. `componentWillMount()`: 组件将要挂载
   - 在组件挂载到DOM前调用
   - 此方法已废弃

3. `render()`: 渲染
   - 返回虚拟DOM
   - 必须是纯函数，不能在其中调用setState

4. `componentDidMount()`: 组件完成挂载
   - 组件挂载到DOM后调用
   - 可以在这里发送ajax请求
   - 可以在这里添加订阅

### 更新阶段
1. `componentWillReceiveProps(nextProps)`: 组件将要接收新的props
   - 当组件接收到新的props时调用
   - 此方法已废弃

2. `shouldComponentUpdate(nextProps,nextState)`: 组件是否应该更新
   - 返回true或false来决定组件是否重新渲染
   - 可以用来优化性能

3. `componentWillUpdate()`: 组件将要更新
   - 组件更新前调用
   - 此方法已废弃

4. `render()`: 重新渲染

5. `componentDidUpdate(prevProps,prevState)`: 组件完成更新
   - 组件更新后调用
   - 可以在这里操作更新后的DOM

### 卸载阶段
1. `componentWillUnmount()`: 组件将要卸载
   - 组件卸载前调用
   - 可以在这里做一些清理工作
   - 例如：清除定时器、取消订阅

## 3. 重要说明
1. 即将废弃的三个钩子：
   - componentWillMount
   - componentWillReceiveProps
   - componentWillUpdate

2. 新版React（16.8+）推荐使用Hooks代替类组件
3. 新版生命周期引入了新的钩子函数，如getDerivedStateFromProps和getSnapshotBeforeUpdate
