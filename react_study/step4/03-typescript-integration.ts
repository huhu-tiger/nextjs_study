/**
 * Zustand TypeScript 集成示例
 * 学习目标：
 * - 类型安全的状态定义
 * - 泛型Store设计
 * - 类型推断和约束
 * - 开发工具集成
 */

import { create, StateCreator } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

// 1. 基础类型定义
interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

interface TodoFilters {
  status: 'all' | 'active' | 'completed'
  search: string
}

// 2. 状态接口定义
interface TodoState {
  // 状态
  todos: Todo[]
  filters: TodoFilters
  isLoading: boolean
  error: string | null
  
  // 基础操作
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => void
  
  // 过滤操作
  setFilter: (filters: Partial<TodoFilters>) => void
  clearCompleted: () => void
  
  // 异步操作
  loadTodos: () => Promise<void>
  saveTodos: () => Promise<void>
  
  // 工具方法
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// 3. 选择器类型定义
type TodoSelectors = {
  getFilteredTodos: (state: TodoState) => Todo[]
  getTodoById: (state: TodoState) => (id: string) => Todo | undefined
  getStats: (state: TodoState) => {
    total: number
    completed: number
    active: number
  }
}

// 4. 创建类型安全的 Store Creator
const createTodoStore: StateCreator<
  TodoState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]],
  [],
  TodoState
> = (set, get) => ({
  // 初始状态
  todos: [],
  filters: {
    status: 'all',
    search: '',
  },
  isLoading: false,
  error: null,
  
  // 基础操作实现
  addTodo: (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    set((state) => ({
      todos: [...state.todos, newTodo],
      error: null,
    }))
  },
  
  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ),
    }))
  },
  
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  },
  
  updateTodo: (id: string, updates) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      ),
    }))
  },
  
  // 过滤操作
  setFilter: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }))
  },
  
  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }))
  },
  
  // 异步操作
  loadTodos: async () => {
    set({ isLoading: true, error: null })
    
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: '学习 Zustand',
          completed: false,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          title: '学习 TypeScript',
          completed: true,
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
      ]
      
      set({ todos: mockTodos, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '加载失败',
        isLoading: false 
      })
    }
  },
  
  saveTodos: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { todos } = get()
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('保存 todos:', todos)
      set({ isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '保存失败',
        isLoading: false 
      })
    }
  },
  
  // 工具方法
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
})

// 5. 创建带中间件的 Store
export const useTodoStore = create<TodoState>()(
  devtools(
    subscribeWithSelector(createTodoStore),
    { name: 'todo-store' }
  )
)

// 6. 类型安全的选择器
export const todoSelectors: TodoSelectors = {
  getFilteredTodos: (state) => {
    const { todos, filters } = state
    
    return todos.filter((todo) => {
      const matchesStatus = 
        filters.status === 'all' ||
        (filters.status === 'active' && !todo.completed) ||
        (filters.status === 'completed' && todo.completed)
      
      const matchesSearch = 
        filters.search === '' ||
        todo.title.toLowerCase().includes(filters.search.toLowerCase())
      
      return matchesStatus && matchesSearch
    })
  },
  
  getTodoById: (state) => (id: string) => {
    return state.todos.find((todo) => todo.id === id)
  },
  
  getStats: (state) => {
    const { todos } = state
    return {
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      active: todos.filter((todo) => !todo.completed).length,
    }
  },
}

// 7. 类型安全的 Hook 创建函数
export const createTypedSelector = <T>(
  selector: (state: TodoState) => T
) => {
  return useTodoStore(selector)
}

// 8. 预定义的选择器 Hooks
export const useFilteredTodos = () => 
  useTodoStore((state) => todoSelectors.getFilteredTodos(state))

export const useTodoStats = () => 
  useTodoStore((state) => todoSelectors.getStats(state))

export const useTodoById = (id: string) => 
  useTodoStore((state) => todoSelectors.getTodoById(state)(id))

// 9. 类型安全的操作 Hooks
export const useTodoActions = () => useTodoStore((state) => ({
  addTodo: state.addTodo,
  toggleTodo: state.toggleTodo,
  deleteTodo: state.deleteTodo,
  updateTodo: state.updateTodo,
  setFilter: state.setFilter,
  clearCompleted: state.clearCompleted,
  loadTodos: state.loadTodos,
  saveTodos: state.saveTodos,
}))

// 10. 状态订阅示例
export const subscribeToTodos = (callback: (todos: Todo[]) => void) => {
  return useTodoStore.subscribe(
    (state) => state.todos,
    callback,
    {
      equalityFn: (a, b) => a.length === b.length && 
        a.every((todo, index) => todo.id === b[index]?.id)
    }
  )
}
