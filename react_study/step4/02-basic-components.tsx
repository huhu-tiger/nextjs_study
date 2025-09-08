/**
 * Zustand 与 React 组件集成示例
 * 学习目标：
 * - 在组件中使用 store
 * - 理解选择器的作用
 * - 学习性能优化技巧
 */

import React from 'react'
import { useCounterStore, useCount, useIncrement } from './01-basic-store'
import { useUserStore, useUserInfo, useUserStatus } from './01-basic-store'

// 1. 基础计数器组件
export const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore()
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>基础计数器</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// 2. 使用选择器的组件 - 只订阅特定状态
export const CountDisplay: React.FC = () => {
  const count = useCount() // 只订阅 count，其他状态变化不会重新渲染
  
  console.log('CountDisplay 重新渲染')
  
  return (
    <div style={{ padding: '10px', background: '#f0f0f0' }}>
      <p>当前计数: {count}</p>
    </div>
  )
}

// 3. 只订阅方法的组件
export const CountControls: React.FC = () => {
  const increment = useIncrement() // 只订阅 increment 方法
  
  console.log('CountControls 重新渲染')
  
  return (
    <button onClick={increment}>
      只增加按钮
    </button>
  )
}

// 4. 用户管理组件
export const UserProfile: React.FC = () => {
  const { user, login, logout, setLoading, setError } = useUserStore()
  const { isLoggedIn, userName, userEmail } = useUserInfo()
  const { isLoading, error } = useUserStatus()
  
  const handleLogin = () => {
    setLoading(true)
    setError(null)
    
    // 模拟异步登录
    setTimeout(() => {
      login({ 
        name: '张三', 
        email: 'zhangsan@example.com' 
      })
      setLoading(false)
    }, 1000)
  }
  
  const handleLogout = () => {
    logout()
  }
  
  if (isLoading) {
    return <div>登录中...</div>
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>用户管理</h3>
      {error && <div style={{ color: 'red' }}>错误: {error}</div>}
      
      {isLoggedIn ? (
        <div>
          <p>欢迎, {userName}!</p>
          <p>邮箱: {userEmail}</p>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <div>
          <p>未登录</p>
          <button onClick={handleLogin}>登录</button>
        </div>
      )}
    </div>
  )
}

// 5. 性能优化示例 - 使用 shallow 比较
import { shallow } from 'zustand/shallow'

export const OptimizedCounter: React.FC = () => {
  // 使用 shallow 比较避免不必要的重新渲染
  const { count, increment, decrement } = useCounterStore(
    (state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
    }),
    shallow
  )
  
  console.log('OptimizedCounter 重新渲染')
  
  return (
    <div style={{ padding: '10px', background: '#e0f0ff' }}>
      <p>优化计数器: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

// 6. 组合示例
export const ZustandDemo: React.FC = () => {
  return (
    <div>
      <h2>Zustand 基础示例</h2>
      <Counter />
      <CountDisplay />
      <CountControls />
      <OptimizedCounter />
      <UserProfile />
    </div>
  )
}
