/**
 * Zustand 异步操作和副作用示例
 * 学习目标：
 * - 异步状态管理
 * - 错误处理策略
 * - 加载状态管理
 * - 缓存和同步
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// 1. 基础异步状态接口
interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  lastFetch: Date | null
}

// 2. 用户数据接口
interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: Date
}

interface UserProfile extends User {
  bio: string
  followers: number
  following: number
  posts: number
}

// 3. 用户管理 Store
interface UserStore extends AsyncState<User[]> {
  selectedUser: User | null
  userProfile: AsyncState<UserProfile>
  
  // 用户列表操作
  fetchUsers: () => Promise<void>
  refreshUsers: () => Promise<void>
  
  // 用户选择操作
  selectUser: (user: User) => void
  clearSelection: () => void
  
  // 用户详情操作
  fetchUserProfile: (userId: string) => Promise<void>
  
  // 工具方法
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      // 初始状态
      data: null,
      isLoading: false,
      error: null,
      lastFetch: null,
      selectedUser: null,
      userProfile: {
        data: null,
        isLoading: false,
        error: null,
        lastFetch: null,
      },
      
      // 用户列表操作
      fetchUsers: async () => {
        const { isLoading, lastFetch } = get()
        
        // 如果正在加载，直接返回
        if (isLoading) return
        
        // 如果数据存在且未过期（5分钟内），直接返回
        const now = new Date()
        if (lastFetch && (now.getTime() - lastFetch.getTime()) < 5 * 60 * 1000) {
          return
        }
        
        set({ isLoading: true, error: null })
        
        try {
          // 模拟 API 调用
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUsers: User[] = [
            {
              id: '1',
              name: '张三',
              email: 'zhangsan@example.com',
              avatar: 'https://via.placeholder.com/50',
              createdAt: new Date('2024-01-01'),
            },
            {
              id: '2',
              name: '李四',
              email: 'lisi@example.com',
              avatar: 'https://via.placeholder.com/50',
              createdAt: new Date('2024-01-02'),
            },
            {
              id: '3',
              name: '王五',
              email: 'wangwu@example.com',
              avatar: 'https://via.placeholder.com/50',
              createdAt: new Date('2024-01-03'),
            },
          ]
          
          set({ 
            data: mockUsers, 
            isLoading: false, 
            lastFetch: new Date(),
            error: null 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : '获取用户列表失败',
            isLoading: false 
          })
        }
      },
      
      refreshUsers: async () => {
        set({ lastFetch: null }) // 清除缓存时间
        await get().fetchUsers()
      },
      
      // 用户选择操作
      selectUser: (user) => set({ selectedUser: user }),
      
      clearSelection: () => set({ selectedUser: null }),
      
      // 用户详情操作
      fetchUserProfile: async (userId) => {
        set((state) => ({
          userProfile: { ...state.userProfile, isLoading: true, error: null }
        }))
        
        try {
          // 模拟 API 调用
          await new Promise(resolve => setTimeout(resolve, 800))
          
          const mockProfile: UserProfile = {
            id: userId,
            name: `用户${userId}`,
            email: `user${userId}@example.com`,
            avatar: 'https://via.placeholder.com/100',
            createdAt: new Date('2024-01-01'),
            bio: `这是用户${userId}的个人简介`,
            followers: Math.floor(Math.random() * 1000),
            following: Math.floor(Math.random() * 500),
            posts: Math.floor(Math.random() * 100),
          }
          
          set((state) => ({
            userProfile: {
              data: mockProfile,
              isLoading: false,
              error: null,
              lastFetch: new Date(),
            }
          }))
        } catch (error) {
          set((state) => ({
            userProfile: {
              ...state.userProfile,
              error: error instanceof Error ? error.message : '获取用户详情失败',
              isLoading: false,
            }
          }))
        }
      },
      
      // 工具方法
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    { name: 'user-store' }
  )
)

// 4. 重试机制 Store
interface RetryConfig {
  maxRetries: number
  delay: number
  backoffMultiplier: number
}

interface ApiStore extends AsyncState<any> {
  retryConfig: RetryConfig
  retryCount: number
  
  fetchWithRetry: (url: string, options?: RequestInit) => Promise<void>
  resetRetry: () => void
}

export const useApiStore = create<ApiStore>()(
  devtools(
    (set, get) => ({
      data: null,
      isLoading: false,
      error: null,
      lastFetch: null,
      retryConfig: {
        maxRetries: 3,
        delay: 1000,
        backoffMultiplier: 2,
      },
      retryCount: 0,
      
      fetchWithRetry: async (url: string, options: RequestInit = {}) => {
        const { retryConfig, retryCount } = get()
        
        if (retryCount >= retryConfig.maxRetries) {
          set({ 
            error: `重试次数已达上限 (${retryConfig.maxRetries})`,
            isLoading: false 
          })
          return
        }
        
        set({ isLoading: true, error: null })
        
        try {
          // 模拟 API 调用，随机失败
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() < 0.7) { // 70% 失败率用于演示
                reject(new Error('网络请求失败'))
              } else {
                resolve({ data: `来自 ${url} 的数据` })
              }
            }, 1000)
          })
          
          set({ 
            data: `来自 ${url} 的数据`,
            isLoading: false,
            error: null,
            lastFetch: new Date(),
            retryCount: 0
          })
        } catch (error) {
          const newRetryCount = retryCount + 1
          const delay = retryConfig.delay * Math.pow(retryConfig.backoffMultiplier, retryCount)
          
          set({ retryCount: newRetryCount })
          
          if (newRetryCount < retryConfig.maxRetries) {
            console.log(`请求失败，${delay}ms 后重试 (${newRetryCount}/${retryConfig.maxRetries})`)
            setTimeout(() => {
              get().fetchWithRetry(url, options)
            }, delay)
          } else {
            set({ 
              error: error instanceof Error ? error.message : '请求失败',
              isLoading: false 
            })
          }
        }
      },
      
      resetRetry: () => set({ retryCount: 0, error: null }),
    }),
    { name: 'api-store' }
  )
)

// 5. 缓存和同步 Store
interface CacheItem<T> {
  data: T
  timestamp: Date
  ttl: number // 生存时间（毫秒）
}

interface CacheStore {
  cache: Map<string, CacheItem<any>>
  
  setCache: <T>(key: string, data: T, ttl?: number) => void
  getCache: <T>(key: string) => T | null
  clearCache: (key?: string) => void
  isExpired: (key: string) => boolean
  getCacheInfo: () => { size: number; keys: string[] }
}

export const useCacheStore = create<CacheStore>()(
  devtools(
    (set, get) => ({
      cache: new Map(),
      
      setCache: (key, data, ttl = 5 * 60 * 1000) => { // 默认5分钟
        const { cache } = get()
        const newCache = new Map(cache)
        newCache.set(key, {
          data,
          timestamp: new Date(),
          ttl,
        })
        set({ cache: newCache })
      },
      
      getCache: (key) => {
        const { cache } = get()
        const item = cache.get(key)
        
        if (!item) return null
        
        // 检查是否过期
        const now = new Date()
        if (now.getTime() - item.timestamp.getTime() > item.ttl) {
          get().clearCache(key)
          return null
        }
        
        return item.data
      },
      
      clearCache: (key) => {
        const { cache } = get()
        const newCache = new Map(cache)
        
        if (key) {
          newCache.delete(key)
        } else {
          newCache.clear()
        }
        
        set({ cache: newCache })
      },
      
      isExpired: (key) => {
        const { cache } = get()
        const item = cache.get(key)
        
        if (!item) return true
        
        const now = new Date()
        return now.getTime() - item.timestamp.getTime() > item.ttl
      },
      
      getCacheInfo: () => {
        const { cache } = get()
        return {
          size: cache.size,
          keys: Array.from(cache.keys()),
        }
      },
    }),
    { name: 'cache-store' }
  )
)

// 6. 乐观更新 Store
interface OptimisticUpdate {
  id: string
  type: 'create' | 'update' | 'delete'
  data: any
  timestamp: Date
}

interface OptimisticStore {
  items: any[]
  pendingUpdates: OptimisticUpdate[]
  
  addItem: (item: any) => Promise<void>
  updateItem: (id: string, updates: any) => Promise<void>
  deleteItem: (id: string) => Promise<void>
  
  commitUpdate: (updateId: string) => void
  rollbackUpdate: (updateId: string) => void
  clearPendingUpdates: () => void
}

export const useOptimisticStore = create<OptimisticStore>()(
  devtools(
    (set, get) => ({
      items: [],
      pendingUpdates: [],
      
      addItem: async (item) => {
        const tempId = `temp_${Date.now()}`
        const optimisticItem = { ...item, id: tempId }
        
        // 乐观更新
        set((state) => ({
          items: [...state.items, optimisticItem],
          pendingUpdates: [
            ...state.pendingUpdates,
            {
              id: tempId,
              type: 'create',
              data: item,
              timestamp: new Date(),
            }
          ]
        }))
        
        try {
          // 模拟 API 调用
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const realId = `real_${Date.now()}`
          const realItem = { ...item, id: realId }
          
          // 提交更新
          set((state) => ({
            items: state.items.map(i => i.id === tempId ? realItem : i),
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== tempId)
          }))
        } catch (error) {
          // 回滚更新
          set((state) => ({
            items: state.items.filter(i => i.id !== tempId),
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== tempId)
          }))
        }
      },
      
      updateItem: async (id, updates) => {
        const updateId = `update_${Date.now()}`
        
        // 乐观更新
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, ...updates } : item
          ),
          pendingUpdates: [
            ...state.pendingUpdates,
            {
              id: updateId,
              type: 'update',
              data: { id, updates },
              timestamp: new Date(),
            }
          ]
        }))
        
        try {
          // 模拟 API 调用
          await new Promise(resolve => setTimeout(resolve, 800))
          
          // 提交更新
          set((state) => ({
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
          }))
        } catch (error) {
          // 回滚更新
          set((state) => ({
            items: state.items.map(item => 
              item.id === id ? { ...item, ...updates } : item // 这里应该恢复到原始状态
            ),
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
          }))
        }
      },
      
      deleteItem: async (id) => {
        const updateId = `delete_${Date.now()}`
        const originalItem = get().items.find(item => item.id === id)
        
        if (!originalItem) return
        
        // 乐观更新
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
          pendingUpdates: [
            ...state.pendingUpdates,
            {
              id: updateId,
              type: 'delete',
              data: { id, originalItem },
              timestamp: new Date(),
            }
          ]
        }))
        
        try {
          // 模拟 API 调用
          await new Promise(resolve => setTimeout(resolve, 600))
          
          // 提交更新
          set((state) => ({
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
          }))
        } catch (error) {
          // 回滚更新
          set((state) => ({
            items: [...state.items, originalItem],
            pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
          }))
        }
      },
      
      commitUpdate: (updateId) => {
        set((state) => ({
          pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
        }))
      },
      
      rollbackUpdate: (updateId) => {
        const { pendingUpdates } = get()
        const update = pendingUpdates.find(u => u.id === updateId)
        
        if (!update) return
        
        // 这里应该实现具体的回滚逻辑
        set((state) => ({
          pendingUpdates: state.pendingUpdates.filter(u => u.id !== updateId)
        }))
      },
      
      clearPendingUpdates: () => {
        set({ pendingUpdates: [] })
      },
    }),
    { name: 'optimistic-store' }
  )
)
