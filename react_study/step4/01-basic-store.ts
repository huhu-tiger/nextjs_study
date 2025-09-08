/**
 * Zustand 基础示例 - 核心概念和API
 * 学习目标：
 * - 理解 create 和 createStore
 * - 掌握状态定义和更新
 * - 学习订阅和选择器
 * - 与React组件集成
 */

import { create } from 'zustand'

// 1. 基础状态定义
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// 2. 使用 create 创建 store
export const useCounterStore = create<CounterState>((set) => ({
  // 初始状态
  count: 0,
  
  // 状态更新方法
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// 3. 选择器示例 - 只订阅特定状态
export const useCount = () => useCounterStore((state) => state.count)
export const useIncrement = () => useCounterStore((state) => state.increment)

// 4. 复杂状态示例
interface UserState {
  user: {
    id: string
    name: string
    email: string
  } | null
  isLoading: boolean
  error: string | null
  login: (userData: { name: string; email: string }) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  login: (userData) => set({ 
    user: { id: Date.now().toString(), ...userData },
    error: null 
  }),
  
  logout: () => set({ user: null, error: null }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
}))

// 5. 选择器示例 - 计算属性
export const useUserInfo = () => useUserStore((state) => ({
  isLoggedIn: !!state.user,
  userName: state.user?.name || 'Guest',
  userEmail: state.user?.email || '',
}))

// 6. 多个选择器组合
export const useUserStatus = () => useUserStore((state) => ({
  isLoading: state.isLoading,
  error: state.error,
  isLoggedIn: !!state.user,
}))
