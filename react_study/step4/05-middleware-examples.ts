/**
 * Zustand 中间件系统示例
 * 学习目标：
 * - devtools 中间件
 * - persist 持久化
 * - immer 不可变更新
 * - 自定义中间件开发
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { subscribeWithSelector } from 'zustand/middleware'

// 1. DevTools 中间件示例
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterWithDevtools = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
    }),
    { name: 'counter-store' }
  )
)

// 2. Persist 持久化中间件示例
interface UserPreferences {
  theme: 'light' | 'dark'
  language: 'zh' | 'en'
  fontSize: 'small' | 'medium' | 'large'
  notifications: boolean
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'zh' | 'en') => void
  setFontSize: (fontSize: 'small' | 'medium' | 'large') => void
  setNotifications: (notifications: boolean) => void
  reset: () => void
}

export const useUserPreferences = create<UserPreferences>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'zh',
      fontSize: 'medium',
      notifications: true,
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setFontSize: (fontSize) => set({ fontSize }),
      setNotifications: (notifications) => set({ notifications }),
      reset: () => set({
        theme: 'light',
        language: 'zh',
        fontSize: 'medium',
        notifications: true,
      }),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage),
      // 选择性持久化
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        fontSize: state.fontSize,
        // notifications 不持久化
      }),
    }
  )
)

// 3. Immer 中间件示例 - 复杂状态更新
interface ShoppingCartItem {
  id: string
  name: string
  price: number
  quantity: number
  selected: boolean
}

interface ShoppingCartState {
  items: ShoppingCartItem[]
  total: number
  addItem: (item: Omit<ShoppingCartItem, 'id' | 'quantity' | 'selected'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleSelection: (id: string) => void
  selectAll: () => void
  clearSelected: () => void
  clearCart: () => void
  calculateTotal: () => void
}

export const useShoppingCart = create<ShoppingCartState>()(
  immer(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.name === item.name)
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          state.items.push({
            ...item,
            id: Date.now().toString(),
            quantity: 1,
            selected: true,
          })
        }
        // 重新计算总价
        state.total = state.items
          .filter(item => item.selected)
          .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }),
      
      removeItem: (id) => set((state) => {
        const index = state.items.findIndex(item => item.id === id)
        if (index !== -1) {
          state.items.splice(index, 1)
          // 重新计算总价
          state.total = state.items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }),
      
      updateQuantity: (id, quantity) => set((state) => {
        const item = state.items.find(item => item.id === id)
        if (item) {
          item.quantity = Math.max(0, quantity)
          // 重新计算总价
          state.total = state.items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }),
      
      toggleSelection: (id) => set((state) => {
        const item = state.items.find(item => item.id === id)
        if (item) {
          item.selected = !item.selected
          // 重新计算总价
          state.total = state.items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      }),
      
      selectAll: () => set((state) => {
        state.items.forEach(item => {
          item.selected = true
        })
        // 重新计算总价
        state.total = state.items
          .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }),
      
      clearSelected: () => set((state) => {
        state.items.forEach(item => {
          item.selected = false
        })
        state.total = 0
      }),
      
      clearCart: () => set((state) => {
        state.items = []
        state.total = 0
      }),
      
      calculateTotal: () => set((state) => {
        state.total = state.items
          .filter(item => item.selected)
          .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }),
    })
  )
)

// 4. 自定义中间件 - 日志中间件
const logger = <T>(
  config: any
) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('状态更新前:', get())
      set(...args)
      console.log('状态更新后:', get())
    },
    get,
    api
  )

// 5. 自定义中间件 - 防抖中间件
const debounce = <T>(
  config: any,
  delay: number = 300
) => (set: any, get: any, api: any) => {
  let timeoutId: NodeJS.Timeout
  
  return config(
    (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        set(...args)
      }, delay)
    },
    get,
    api
  )
}

// 6. 自定义中间件 - 验证中间件
const validator = <T>(
  config: any,
  validate: (state: T) => boolean
) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      const newState = { ...get(), ...args[0] }
      if (validate(newState)) {
        set(...args)
      } else {
        console.warn('状态验证失败，更新被拒绝')
      }
    },
    get,
    api
  )

// 7. 组合多个中间件的示例
interface SearchState {
  query: string
  results: string[]
  isLoading: boolean
  setQuery: (query: string) => void
  setResults: (results: string[]) => void
  setLoading: (loading: boolean) => void
  search: (query: string) => Promise<void>
}

export const useSearchWithMiddleware = create<SearchState>()(
  devtools(
    persist(
      debounce(
        validator(
          (set, get) => ({
            query: '',
            results: [],
            isLoading: false,
            
            setQuery: (query) => set({ query }),
            setResults: (results) => set({ results }),
            setLoading: (loading) => set({ isLoading: loading }),
            
            search: async (query) => {
              set({ isLoading: true, query })
              
              try {
                // 模拟 API 调用
                await new Promise(resolve => setTimeout(resolve, 1000))
                const mockResults = [
                  `结果1: ${query}`,
                  `结果2: ${query}`,
                  `结果3: ${query}`,
                ]
                set({ results: mockResults, isLoading: false })
              } catch (error) {
                set({ results: [], isLoading: false })
              }
            },
          }),
          (state) => state.query.length >= 0 // 验证规则
        ),
        500 // 防抖延迟
      ),
      {
        name: 'search-store',
        partialize: (state) => ({ query: state.query }), // 只持久化查询
      }
    ),
    { name: 'search-with-middleware' }
  )
)

// 8. SubscribeWithSelector 中间件示例
interface NotificationState {
  notifications: Array<{
    id: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: Date
  }>
  addNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationState>()(
  subscribeWithSelector(
    (set) => ({
      notifications: [],
      
      addNotification: (message, type) => set((state) => ({
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            message,
            type,
            timestamp: new Date(),
          }
        ]
      })),
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      clearAll: () => set({ notifications: [] }),
    })
  )
)

// 9. 订阅示例
export const subscribeToNotifications = (callback: (notifications: NotificationState['notifications']) => void) => {
  return useNotificationStore.subscribe(
    (state) => state.notifications,
    callback
  )
}
