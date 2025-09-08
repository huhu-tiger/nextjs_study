/**
 * Zustand 状态管理最佳实践示例
 * 学习目标：
 * - 架构设计模式
 * - 状态切片和模块化
 * - 状态结构设计
 * - 性能优化策略
 * - 与其他库集成
 */

import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

// 1. 状态切片模式 - 将大型状态分解为小的、可管理的切片

// 用户切片
interface UserSlice {
  user: {
    id: string
    name: string
    email: string
    avatar: string
  } | null
  isAuthenticated: boolean
  login: (userData: { name: string; email: string; avatar: string }) => void
  logout: () => void
  updateProfile: (updates: Partial<{ name: string; email: string; avatar: string }>) => void
}

// 主题切片
interface ThemeSlice {
  theme: 'light' | 'dark'
  primaryColor: string
  fontSize: 'small' | 'medium' | 'large'
  setTheme: (theme: 'light' | 'dark') => void
  setPrimaryColor: (color: string) => void
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  resetTheme: () => void
}

// 通知切片
interface NotificationSlice {
  notifications: Array<{
    id: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
    read: boolean
  }>
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  getUnreadCount: () => number
}

// 2. 组合切片创建主 Store
type AppStore = UserSlice & ThemeSlice & NotificationSlice

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer(
        subscribeWithSelector(
          (set, get) => ({
            // 用户切片
            user: null,
            isAuthenticated: false,
            
            login: (userData) => set((state) => {
              state.user = { id: Date.now().toString(), ...userData }
              state.isAuthenticated = true
            }),
            
            logout: () => set((state) => {
              state.user = null
              state.isAuthenticated = false
            }),
            
            updateProfile: (updates) => set((state) => {
              if (state.user) {
                Object.assign(state.user, updates)
              }
            }),
            
            // 主题切片
            theme: 'light',
            primaryColor: '#007bff',
            fontSize: 'medium',
            
            setTheme: (theme) => set((state) => {
              state.theme = theme
            }),
            
            setPrimaryColor: (color) => set((state) => {
              state.primaryColor = color
            }),
            
            setFontSize: (size) => set((state) => {
              state.fontSize = size
            }),
            
            resetTheme: () => set((state) => {
              state.theme = 'light'
              state.primaryColor = '#007bff'
              state.fontSize = 'medium'
            }),
            
            // 通知切片
            notifications: [],
            
            addNotification: (message, type) => set((state) => {
              state.notifications.push({
                id: Date.now().toString(),
                message,
                type,
                timestamp: new Date(),
                read: false,
              })
            }),
            
            removeNotification: (id) => set((state) => {
              const index = state.notifications.findIndex(n => n.id === id)
              if (index !== -1) {
                state.notifications.splice(index, 1)
              }
            }),
            
            markAsRead: (id) => set((state) => {
              const notification = state.notifications.find(n => n.id === id)
              if (notification) {
                notification.read = true
              }
            }),
            
            markAllAsRead: () => set((state) => {
              state.notifications.forEach(n => n.read = true)
            }),
            
            clearAll: () => set((state) => {
              state.notifications = []
            }),
            
            getUnreadCount: () => {
              return get().notifications.filter(n => !n.read).length
            },
          })
        )
      ),
      {
        name: 'app-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme,
          primaryColor: state.primaryColor,
          fontSize: state.fontSize,
        }),
      }
    ),
    { name: 'app-store' }
  )
)

// 3. 选择器 Hooks - 性能优化
export const useUser = () => useAppStore((state) => state.user)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useUserActions = () => useAppStore((state) => ({
  login: state.login,
  logout: state.logout,
  updateProfile: state.updateProfile,
}))

export const useTheme = () => useAppStore((state) => ({
  theme: state.theme,
  primaryColor: state.primaryColor,
  fontSize: state.fontSize,
}))
export const useThemeActions = () => useAppStore((state) => ({
  setTheme: state.setTheme,
  setPrimaryColor: state.setPrimaryColor,
  setFontSize: state.setFontSize,
  resetTheme: state.resetTheme,
}))

export const useNotifications = () => useAppStore((state) => state.notifications)
export const useUnreadCount = () => useAppStore((state) => state.getUnreadCount())
export const useNotificationActions = () => useAppStore((state) => ({
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  markAsRead: state.markAsRead,
  markAllAsRead: state.markAllAsRead,
  clearAll: state.clearAll,
}))

// 4. 状态订阅示例
export const subscribeToUser = (callback: (user: UserSlice['user']) => void) => {
  return useAppStore.subscribe(
    (state) => state.user,
    callback
  )
}

export const subscribeToNotifications = (callback: (notifications: NotificationSlice['notifications']) => void) => {
  return useAppStore.subscribe(
    (state) => state.notifications,
    callback
  )
}

// 5. 状态验证和约束
interface ValidationRules {
  email: (email: string) => boolean
  name: (name: string) => boolean
  color: (color: string) => boolean
}

const validationRules: ValidationRules = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  name: (name) => name.trim().length >= 2,
  color: (color) => /^#[0-9A-F]{6}$/i.test(color),
}

// 6. 状态工厂模式 - 创建可复用的状态逻辑
interface StateFactory<T> {
  createStore: (initialState: T) => any
  createSelectors: (store: any) => Record<string, any>
  createActions: (store: any) => Record<string, any>
}

// 7. 状态模式 - 状态机模式
type LoadingState = 'idle' | 'loading' | 'success' | 'error'

interface AsyncStateMachine<T> {
  state: LoadingState
  data: T | null
  error: string | null
  startLoading: () => void
  setSuccess: (data: T) => void
  setError: (error: string) => void
  reset: () => void
}

const createAsyncStateMachine = <T>(): AsyncStateMachine<T> => ({
  state: 'idle',
  data: null,
  error: null,
  startLoading: () => {},
  setSuccess: () => {},
  setError: () => {},
  reset: () => {},
})

// 8. 状态组合模式 - 组合多个状态
interface CombinedState {
  user: UserSlice
  theme: ThemeSlice
  notifications: NotificationSlice
  // 计算属性
  isDarkMode: boolean
  hasUnreadNotifications: boolean
  userDisplayName: string
}

// 9. 状态持久化策略
interface PersistenceStrategy {
  key: string
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB'
  serialize: (state: any) => string
  deserialize: (data: string) => any
  shouldPersist: (state: any) => boolean
}

// 10. 状态调试工具
interface DebugConfig {
  enabled: boolean
  logStateChanges: boolean
  logActions: boolean
  logSelectors: boolean
  maxLogEntries: number
}

const debugConfig: DebugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  logStateChanges: true,
  logActions: true,
  logSelectors: false,
  maxLogEntries: 100,
}

// 11. 状态测试工具
interface TestUtils {
  mockStore: (initialState: any) => any
  resetStore: () => void
  getStoreState: () => any
  dispatchAction: (action: string, payload?: any) => void
}

// 12. 状态性能监控
interface PerformanceMetrics {
  renderCount: number
  lastRenderTime: number
  averageRenderTime: number
  memoryUsage: number
}

// 13. 状态错误边界
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: any
  resetError: () => void
}

// 14. 状态中间件组合
const createMiddlewareStack = () => {
  return [
    devtools,
    persist,
    immer,
    subscribeWithSelector,
  ]
}

// 15. 状态类型安全工具
type StateKeys<T> = keyof T
type StateValues<T> = T[keyof T]
type ActionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

// 16. 状态选择器工具
const createSelector = <T, R>(
  selector: (state: T) => R,
  equalityFn?: (a: R, b: R) => boolean
) => {
  return (state: T) => selector(state)
}

// 17. 状态订阅工具
const createSubscription = <T>(
  store: any,
  selector: (state: T) => any,
  callback: (value: any) => void
) => {
  return store.subscribe(selector, callback)
}

// 18. 状态验证工具
const validateState = <T>(
  state: T,
  rules: Record<keyof T, (value: any) => boolean>
): boolean => {
  return Object.entries(rules).every(([key, validator]) => {
    return validator(state[key as keyof T])
  })
}

// 19. 状态序列化工具
const serializeState = (state: any): string => {
  return JSON.stringify(state, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() }
    }
    return value
  })
}

const deserializeState = (data: string): any => {
  return JSON.parse(data, (key, value) => {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value)
    }
    return value
  })
}

// 20. 状态迁移工具
interface StateMigration {
  version: number
  migrate: (state: any) => any
}

const createStateMigration = (migrations: StateMigration[]) => {
  return (state: any, currentVersion: number) => {
    return migrations
      .filter(migration => migration.version > currentVersion)
      .reduce((acc, migration) => migration.migrate(acc), state)
  }
}
