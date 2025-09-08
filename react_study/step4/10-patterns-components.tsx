/**
 * 状态管理最佳实践的 React 组件示例
 * 学习目标：
 * - 在组件中应用最佳实践
 * - 性能优化技巧
 * - 状态管理模式
 * - 调试和测试策略
 */

import React, { useEffect, useState, useMemo } from 'react'
import { 
  useAppStore,
  useUser,
  useIsAuthenticated,
  useUserActions,
  useTheme,
  useThemeActions,
  useNotifications,
  useUnreadCount,
  useNotificationActions,
  subscribeToUser,
  subscribeToNotifications
} from './09-best-practices'

// 1. 用户认证组件
const UserAuth: React.FC = () => {
  const user = useUser()
  const isAuthenticated = useIsAuthenticated()
  const { login, logout, updateProfile } = useUserActions()
  
  const [loginForm, setLoginForm] = useState({
    name: '',
    email: '',
    avatar: ''
  })
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    avatar: ''
  })
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.name && loginForm.email) {
      login({
        name: loginForm.name,
        email: loginForm.email,
        avatar: loginForm.avatar || 'https://via.placeholder.com/50'
      })
      setLoginForm({ name: '', email: '', avatar: '' })
    }
  }
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (profileForm.name || profileForm.email || profileForm.avatar) {
      updateProfile(profileForm)
      setProfileForm({ name: '', email: '', avatar: '' })
    }
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>用户认证</h3>
      
      {isAuthenticated ? (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h4>当前用户</h4>
            <img 
              src={user?.avatar} 
              alt={user?.name}
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span>{user?.name}</span>
            <span style={{ color: '#666', marginLeft: '10px' }}>{user?.email}</span>
          </div>
          
          <div>
            <h4>更新资料</h4>
            <form onSubmit={handleUpdateProfile}>
              <input
                type="text"
                placeholder="新姓名"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                style={{ padding: '8px', margin: '5px', width: '150px' }}
              />
              <input
                type="email"
                placeholder="新邮箱"
                value={profileForm.email}
                onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                style={{ padding: '8px', margin: '5px', width: '150px' }}
              />
              <input
                type="url"
                placeholder="新头像URL"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm(prev => ({ ...prev, avatar: e.target.value }))}
                style={{ padding: '8px', margin: '5px', width: '150px' }}
              />
              <button type="submit" style={{ padding: '8px', margin: '5px' }}>更新</button>
            </form>
          </div>
          
          <button onClick={logout} style={{ marginTop: '10px' }}>登出</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="姓名"
            value={loginForm.name}
            onChange={(e) => setLoginForm(prev => ({ ...prev, name: e.target.value }))}
            required
            style={{ padding: '8px', margin: '5px', width: '150px' }}
          />
          <input
            type="email"
            placeholder="邮箱"
            value={loginForm.email}
            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
            required
            style={{ padding: '8px', margin: '5px', width: '150px' }}
          />
          <input
            type="url"
            placeholder="头像URL (可选)"
            value={loginForm.avatar}
            onChange={(e) => setLoginForm(prev => ({ ...prev, avatar: e.target.value }))}
            style={{ padding: '8px', margin: '5px', width: '150px' }}
          />
          <button type="submit" style={{ padding: '8px', margin: '5px' }}>登录</button>
        </form>
      )}
    </div>
  )
}

// 2. 主题设置组件
const ThemeSettings: React.FC = () => {
  const theme = useTheme()
  const { setTheme, setPrimaryColor, setFontSize, resetTheme } = useThemeActions()
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme.theme === 'dark' ? '#333' : '#fff',
      color: theme.theme === 'dark' ? '#fff' : '#000',
      fontSize: theme.fontSize === 'small' ? '12px' : theme.fontSize === 'large' ? '18px' : '14px'
    }}>
      <h3>主题设置</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label>主题模式: </label>
        <select 
          value={theme.theme} 
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          style={{ padding: '5px', margin: '5px' }}
        >
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>主色调: </label>
        <input
          type="color"
          value={theme.primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          style={{ margin: '5px' }}
        />
        <span style={{ marginLeft: '10px' }}>{theme.primaryColor}</span>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label>字体大小: </label>
        <select 
          value={theme.fontSize} 
          onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
          style={{ padding: '5px', margin: '5px' }}
        >
          <option value="small">小</option>
          <option value="medium">中</option>
          <option value="large">大</option>
        </select>
      </div>
      
      <button onClick={resetTheme} style={{ padding: '8px' }}>重置主题</button>
    </div>
  )
}

// 3. 通知管理组件
const NotificationManager: React.FC = () => {
  const notifications = useNotifications()
  const unreadCount = useUnreadCount()
  const { addNotification, removeNotification, markAsRead, markAllAsRead, clearAll } = useNotificationActions()
  
  const [newMessage, setNewMessage] = useState('')
  const [newType, setNewType] = useState<'info' | 'success' | 'warning' | 'error'>('info')
  
  // 订阅通知变化
  useEffect(() => {
    const unsubscribe = subscribeToNotifications((notifications) => {
      console.log('通知更新:', notifications.length)
    })
    
    return unsubscribe
  }, [])
  
  const handleAddNotification = () => {
    if (newMessage.trim()) {
      addNotification(newMessage, newType)
      setNewMessage('')
    }
  }
  
  const getNotificationStyle = (type: string) => {
    const styles = {
      info: { background: '#e3f2fd', color: '#1976d2', border: '1px solid #bbdefb' },
      success: { background: '#e8f5e8', color: '#2e7d32', border: '1px solid #c8e6c9' },
      warning: { background: '#fff3e0', color: '#f57c00', border: '1px solid #ffcc02' },
      error: { background: '#ffebee', color: '#d32f2f', border: '1px solid #ffcdd2' },
    }
    return styles[type as keyof typeof styles] || styles.info
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>通知管理</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>添加通知</h4>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="通知消息"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ padding: '8px', margin: '5px', width: '200px' }}
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as any)}
            style={{ padding: '8px', margin: '5px' }}
          >
            <option value="info">信息</option>
            <option value="success">成功</option>
            <option value="warning">警告</option>
            <option value="error">错误</option>
          </select>
          <button onClick={handleAddNotification} style={{ padding: '8px', margin: '5px' }}>
            添加
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>通知列表 ({notifications.length})</h4>
        {unreadCount > 0 && (
          <div style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '10px' }}>
            未读通知: {unreadCount}
          </div>
        )}
        
        <div style={{ marginBottom: '10px' }}>
          <button onClick={markAllAsRead} style={{ padding: '5px', margin: '2px' }}>
            全部标记为已读
          </button>
          <button onClick={clearAll} style={{ padding: '5px', margin: '2px' }}>
            清除所有
          </button>
        </div>
        
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
                  opacity: notification.read ? 0.7 : 1,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{notification.message}</span>
                  <div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{ 
                          padding: '2px 6px', 
                          margin: '0 5px',
                          fontSize: '12px',
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px'
                        }}
                      >
                        标记已读
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      style={{ 
                        padding: '2px 6px',
                        fontSize: '12px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 4. 性能优化组件 - 使用 useMemo 和选择器
const PerformanceOptimizedComponent: React.FC = () => {
  const user = useUser()
  const theme = useTheme()
  const notifications = useNotifications()
  
  // 使用 useMemo 缓存计算结果
  const userStats = useMemo(() => {
    console.log('计算用户统计信息')
    return {
      nameLength: user?.name?.length || 0,
      emailDomain: user?.email?.split('@')[1] || '',
      hasAvatar: !!user?.avatar,
    }
  }, [user?.name, user?.email, user?.avatar])
  
  const notificationStats = useMemo(() => {
    console.log('计算通知统计信息')
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      byType: notifications.reduce((acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }
  }, [notifications])
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme.theme === 'dark' ? '#333' : '#fff',
      color: theme.theme === 'dark' ? '#fff' : '#000'
    }}>
      <h3>性能优化组件</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>用户统计</h4>
        <p>姓名长度: {userStats.nameLength}</p>
        <p>邮箱域名: {userStats.emailDomain}</p>
        <p>有头像: {userStats.hasAvatar ? '是' : '否'}</p>
      </div>
      
      <div>
        <h4>通知统计</h4>
        <p>总通知数: {notificationStats.total}</p>
        <p>未读通知: {notificationStats.unread}</p>
        <div>
          <h5>按类型统计:</h5>
          {Object.entries(notificationStats.byType).map(([type, count]) => (
            <span key={type} style={{ marginRight: '10px' }}>
              {type}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. 状态调试组件
const StateDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  
  useEffect(() => {
    const updateDebugInfo = () => {
      const state = useAppStore.getState()
      setDebugInfo({
        timestamp: new Date().toISOString(),
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        notificationCount: state.notifications.length,
        unreadCount: state.getUnreadCount(),
      })
    }
    
    updateDebugInfo()
    
    // 订阅状态变化
    const unsubscribe = useAppStore.subscribe(updateDebugInfo)
    
    return unsubscribe
  }, [])
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>状态调试器</h3>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        borderRadius: '4px',
        fontSize: '12px',
        overflow: 'auto',
        maxHeight: '300px'
      }}>
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  )
}

// 6. 主应用组件
const BestPracticesDemo: React.FC = () => {
  return (
    <div>
      <h2>Zustand 状态管理最佳实践示例</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <UserAuth />
          <ThemeSettings />
        </div>
        <div>
          <NotificationManager />
          <PerformanceOptimizedComponent />
        </div>
      </div>
      <StateDebugger />
    </div>
  )
}

export default BestPracticesDemo
