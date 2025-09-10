# QueryClientProvider 尽量包裹在最上层App组件上

# React 的 children 机制
在 React 中，当你在组件标签之间放置内容时，这些内容会自动作为 children prop 传递给组件：
```javascript
// 这种写法
<TankQueryProviderBase>
  <App />
</TankQueryProviderBase>

// 等价于
<TankQueryProviderBase children={<App />} />
```