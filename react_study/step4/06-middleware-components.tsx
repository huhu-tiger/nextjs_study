/**
 * 中间件系统的 React 组件示例
 * 学习目标：
 * - 在组件中使用各种中间件
 * - 理解中间件的作用和效果
 * - 学习性能优化技巧
 */

import React, { useEffect, useState } from 'react'
import { 
  useCounterWithDevtools,
  useUserPreferences,
  useShoppingCart,
  useSearchWithMiddleware,
  useNotificationStore,
  subscribeToNotifications
} from './05-middleware-examples'

// 1. DevTools 中间件组件
const DevToolsExample: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterWithDevtools()
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>DevTools 中间件示例</h3>
      <p>计数: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>重置</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        打开浏览器 DevTools 查看状态变化
      </p>
    </div>
  )
}

// 2. 持久化中间件组件
const UserPreferencesExample: React.FC = () => {
  const {
    theme,
    language,
    fontSize,
    notifications,
    setTheme,
    setLanguage,
    setFontSize,
    setNotifications,
    reset
  } = useUserPreferences()
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: fontSize === 'small' ? '12px' : fontSize === 'large' ? '18px' : '14px'
    }}>
      <h3>持久化中间件示例</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <label>主题: </label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>语言: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value as 'zh' | 'en')}>
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>字体大小: </label>
        <select value={fontSize} onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}>
          <option value="small">小</option>
          <option value="medium">中</option>
          <option value="large">大</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          通知 (不持久化)
        </label>
      </div>
      
      <button onClick={reset}>重置设置</button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        设置会自动保存到 localStorage
      </p>
    </div>
  )
}

// 3. Immer 中间件组件 - 购物车
const ShoppingCartExample: React.FC = () => {
  const {
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
    toggleSelection,
    selectAll,
    clearSelected,
    clearCart
  } = useShoppingCart()
  
  const sampleItems = [
    { name: '苹果', price: 5 },
    { name: '香蕉', price: 3 },
    { name: '橙子', price: 4 },
  ]
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Immer 中间件示例 - 购物车</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>添加商品</h4>
        {sampleItems.map((item, index) => (
          <button
            key={index}
            onClick={() => addItem(item)}
            style={{ margin: '5px' }}
          >
            添加 {item.name} (¥{item.price})
          </button>
        ))}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>购物车</h4>
        {items.length === 0 ? (
          <p>购物车为空</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '5px',
                border: '1px solid #eee',
                margin: '5px 0'
              }}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelection(item.id)}
                />
                <span style={{ flex: 1 }}>{item.name}</span>
                <span>¥{item.price}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  min="0"
                  style={{ width: '60px' }}
                />
                <button onClick={() => removeItem(item.id)}>删除</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>操作</h4>
        <button onClick={selectAll}>全选</button>
        <button onClick={clearSelected}>取消全选</button>
        <button onClick={clearCart}>清空购物车</button>
      </div>
      
      <div style={{ 
        padding: '10px', 
        background: '#f0f0f0', 
        fontWeight: 'bold' 
      }}>
        总价: ¥{total}
      </div>
    </div>
  )
}

// 4. 搜索中间件组件
const SearchExample: React.FC = () => {
  const { query, results, isLoading, setQuery, search } = useSearchWithMiddleware()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      search(query)
    }
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>搜索中间件示例 (防抖 + 持久化 + DevTools)</h3>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入搜索关键词..."
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '搜索中...' : '搜索'}
        </button>
      </form>
      
      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>搜索结果:</h4>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
      
      <p style={{ fontSize: '12px', color: '#666' }}>
        搜索有 500ms 防抖，查询会持久化到 localStorage
      </p>
    </div>
  )
}

// 5. 通知中间件组件
const NotificationExample: React.FC = () => {
  const { notifications, addNotification, removeNotification, clearAll } = useNotificationStore()
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info')
  
  // 订阅通知变化
  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifications) => {
      console.log('通知更新:', notifications.length)
    })
    
    return unsubscribe
  }, [])
  
  const handleAddNotification = () => {
    if (message.trim()) {
      addNotification(message, type)
      setMessage('')
    }
  }
  
  const getNotificationStyle = (notificationType: string) => {
    const styles = {
      info: { background: '#e3f2fd', color: '#1976d2' },
      success: { background: '#e8f5e8', color: '#2e7d32' },
      warning: { background: '#fff3e0', color: '#f57c00' },
      error: { background: '#ffebee', color: '#d32f2f' },
    }
    return styles[notificationType as keyof typeof styles] || styles.info
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>通知中间件示例 (SubscribeWithSelector)</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="输入通知消息..."
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="info">信息</option>
          <option value="success">成功</option>
          <option value="warning">警告</option>
          <option value="error">错误</option>
        </select>
        <button onClick={handleAddNotification}>添加通知</button>
        <button onClick={clearAll} style={{ marginLeft: '10px' }}>清除所有</button>
      </div>
      
      <div>
        <h4>通知列表:</h4>
        {notifications.length === 0 ? (
          <p>暂无通知</p>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: '10px',
                  margin: '5px 0',
                  borderRadius: '4px',
                  ...getNotificationStyle(notification.type),
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{notification.message}</span>
                <button
                  onClick={() => removeNotification(notification.id)}
                  style={{ marginLeft: '10px' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 6. 主应用组件
const MiddlewareDemo: React.FC = () => {
  return (
    <div>
      <h2>Zustand 中间件系统示例</h2>
      <DevToolsExample />
      <UserPreferencesExample />
      <ShoppingCartExample />
      <SearchExample />
      <NotificationExample />
    </div>
  )
}

export default MiddlewareDemo
