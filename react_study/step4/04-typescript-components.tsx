/**
 * TypeScript 集成的 React 组件示例
 * 学习目标：
 * - 类型安全的组件开发
 * - 泛型组件使用
 * - 事件处理类型安全
 * - 状态管理类型设计
 */

import React, { useEffect, useState } from 'react'
import { 
  useTodoStore, 
  useFilteredTodos, 
  useTodoStats, 
  useTodoById,
  useTodoActions,
  subscribeToTodos,
  type Todo,
  type TodoFilters 
} from './03-typescript-integration'

// 1. 类型安全的 Todo 项组件
interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  
  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, { title: editTitle.trim() })
      setIsEditing(false)
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title)
      setIsEditing(false)
    }
  }
  
  return (
    <div style={{ 
      padding: '10px', 
      border: '1px solid #ddd', 
      margin: '5px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
          style={{ flex: 1 }}
        />
      ) : (
        <span 
          style={{ 
            flex: 1, 
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer'
          }}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}
      
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? '取消' : '编辑'}
      </button>
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </div>
  )
}

// 2. 类型安全的过滤器组件
interface FilterProps {
  filters: TodoFilters
  onFilterChange: (filters: Partial<TodoFilters>) => void
}

const TodoFilter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value as TodoFilters['status'] })
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value })
  }
  
  return (
    <div style={{ padding: '10px', background: '#f5f5f5', margin: '10px 0' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>状态筛选: </label>
        <select value={filters.status} onChange={handleStatusChange}>
          <option value="all">全部</option>
          <option value="active">未完成</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      
      <div>
        <label>搜索: </label>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="搜索待办事项..."
        />
      </div>
    </div>
  )
}

// 3. 类型安全的统计组件
const TodoStats: React.FC = () => {
  const stats = useTodoStats()
  
  return (
    <div style={{ 
      padding: '10px', 
      background: '#e8f4fd', 
      margin: '10px 0',
      borderRadius: '4px'
    }}>
      <h4>统计信息</h4>
      <p>总计: {stats.total}</p>
      <p>已完成: {stats.completed}</p>
      <p>未完成: {stats.active}</p>
      <p>完成率: {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</p>
    </div>
  )
}

// 4. 类型安全的添加待办事项组件
const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('')
  const { addTodo } = useTodoActions()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      addTodo(title)
      setTitle('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} style={{ margin: '10px 0' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加新的待办事项..."
        style={{ 
          padding: '8px', 
          marginRight: '10px', 
          width: '300px' 
        }}
      />
      <button type="submit">添加</button>
    </form>
  )
}

// 5. 类型安全的待办事项列表组件
const TodoList: React.FC = () => {
  const filteredTodos = useFilteredTodos()
  const { toggleTodo, deleteTodo, updateTodo } = useTodoActions()
  
  if (filteredTodos.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        color: '#666' 
      }}>
        暂无待办事项
      </div>
    )
  }
  
  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  )
}

// 6. 类型安全的操作按钮组件
const TodoActions: React.FC = () => {
  const { clearCompleted, loadTodos, saveTodos } = useTodoActions()
  const { isLoading, error } = useTodoStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
  }))
  
  return (
    <div style={{ padding: '10px', margin: '10px 0' }}>
      <button onClick={loadTodos} disabled={isLoading}>
        {isLoading ? '加载中...' : '加载待办事项'}
      </button>
      <button onClick={saveTodos} disabled={isLoading}>
        {isLoading ? '保存中...' : '保存待办事项'}
      </button>
      <button onClick={clearCompleted}>
        清除已完成
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          错误: {error}
        </div>
      )}
    </div>
  )
}

// 7. 主应用组件
const TodoApp: React.FC = () => {
  const filters = useTodoStore((state) => state.filters)
  const { setFilter } = useTodoActions()
  
  // 订阅待办事项变化
  useEffect(() => {
    const unsubscribe = subscribeToTodos((todos) => {
      console.log('待办事项更新:', todos.length)
    })
    
    return unsubscribe
  }, [])
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>TypeScript + Zustand 待办事项应用</h2>
      
      <AddTodo />
      
      <TodoFilter 
        filters={filters} 
        onFilterChange={setFilter} 
      />
      
      <TodoStats />
      
      <TodoActions />
      
      <TodoList />
    </div>
  )
}

export default TodoApp
