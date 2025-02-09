# React生命周期(新)

## 1. 生命周期流程图
![react生命周期(新)](./images/react生命周期(新).png)

## 2. 生命周期三个阶段
### 挂载阶段
1. `constructor()`: 构造函数
   - 初始化state
   - 绑定事件处理函数

2. `static getDerivedStateFromProps(props, state)`: 从props获取state
   - 静态方法，不能使用this
   - 返回一个对象来更新state，返回null则不更新
   - 用于state的值依赖于props的情况

3. `render()`: 渲染
   - 返回虚拟DOM
   - 必须是纯函数

4. `componentDidMount()`: 组件挂载完成
   - 可以进行DOM操作
   - 适合发送网络请求
   - 添加订阅

### 更新阶段
1. `static getDerivedStateFromProps(props, state)`
   - 同挂载阶段

2. `shouldComponentUpdate(nextProps, nextState)`: 是否应该更新
   - 返回false可以阻止更新
   - 用于性能优化

3. `render()`
   - 同挂载阶段

4. `getSnapshotBeforeUpdate(prevProps, prevState)`: 获取更新前的快照
   - 在最近一次渲染输出之前调用
   - 返回值传递给componentDidUpdate
   - 用于获取更新前的DOM状态

5. `componentDidUpdate(prevProps, prevState, snapshot)`: 组件更新完成
   - 可以操作更新后的DOM
   - 可以发送网络请求
   - 注意要有条件限制，避免死循环

### 卸载阶段
1. `componentWillUnmount()`: 组件即将卸载
   - 清除定时器
   - 取消订阅
   - 取消网络请求

## 3. 重要说明
1. 新版本移除了三个钩子函数：
   - componentWillMount
   - componentWillReceiveProps
   - componentWillUpdate

2. 新增了两个钩子函数：
   - static getDerivedStateFromProps
   - getSnapshotBeforeUpdate

3. 新的生命周期更加清晰，强调单向数据流

4. 建议使用React Hooks代替类组件，但在某些场景下类组件仍然有其优势
