/**
 * 异步操作和副作用的 React 组件示例
 * 学习目标：
 * - 在组件中处理异步状态
 * - 错误处理和重试机制
 * - 加载状态管理
 * - 缓存和同步策略
 */

import React, { useEffect, useState } from 'react'
import { 
  useUserStore,
  useApiStore,
  useCacheStore,
  useOptimisticStore
} from './07-async-operations'

// 1. 用户列表组件
const UserList: React.FC = () => {
  const { 
    data: users, 
    isLoading, 
    error, 
    lastFetch,
    fetchUsers, 
    refreshUsers,
    selectUser,
    selectedUser 
  } = useUserStore()
  
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  
  const handleRefresh = () => {
    refreshUsers()
  }
  
  if (isLoading && !users) {
    return <div>加载用户列表中...</div>
  }
  
  if (error) {
    return (
      <div style={{ color: 'red' }}>
        错误: {error}
        <button onClick={handleRefresh} style={{ marginLeft: '10px' }}>
          重试
        </button>
      </div>
    )
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>用户列表</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? '刷新中...' : '刷新'}
        </button>
        {lastFetch && (
          <span style={{ fontSize: '12px', color: '#666', marginLeft: '10px' }}>
            最后更新: {lastFetch.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      {users && (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => selectUser(user)}
              style={{
                padding: '10px',
                border: selectedUser?.id === user.id ? '2px solid #007bff' : '1px solid #ddd',
                margin: '5px 0',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
              />
              <span>{user.name}</span>
              <span style={{ color: '#666', marginLeft: '10px' }}>{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 2. 用户详情组件
const UserProfile: React.FC = () => {
  const { selectedUser, userProfile, fetchUserProfile } = useUserStore()
  
  useEffect(() => {
    if (selectedUser) {
      fetchUserProfile(selectedUser.id)
    }
  }, [selectedUser, fetchUserProfile])
  
  if (!selectedUser) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>用户详情</h3>
        <p>请选择一个用户</p>
      </div>
    )
  }
  
  if (userProfile.isLoading) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>用户详情</h3>
        <div>加载用户详情中...</div>
      </div>
    )
  }
  
  if (userProfile.error) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>用户详情</h3>
        <div style={{ color: 'red' }}>错误: {userProfile.error}</div>
      </div>
    )
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>用户详情</h3>
      {userProfile.data && (
        <div>
          <img 
            src={userProfile.data.avatar} 
            alt={userProfile.data.name}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h4>{userProfile.data.name}</h4>
          <p>邮箱: {userProfile.data.email}</p>
          <p>简介: {userProfile.data.bio}</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <span>关注者: {userProfile.data.followers}</span>
            <span>关注中: {userProfile.data.following}</span>
            <span>帖子: {userProfile.data.posts}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// 3. API 重试组件
const ApiRetryExample: React.FC = () => {
  const { 
    data, 
    isLoading, 
    error, 
    retryCount,
    fetchWithRetry, 
    resetRetry 
  } = useApiStore()
  
  const [url, setUrl] = useState('https://api.example.com/data')
  
  const handleFetch = () => {
    fetchWithRetry(url)
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>API 重试机制示例</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={handleFetch} disabled={isLoading}>
          {isLoading ? '请求中...' : '发送请求'}
        </button>
        <button onClick={resetRetry} style={{ marginLeft: '10px' }}>
          重置重试
        </button>
      </div>
      
      {retryCount > 0 && (
        <div style={{ color: 'orange', marginBottom: '10px' }}>
          重试次数: {retryCount}/3
        </div>
      )}
      
      {data && (
        <div style={{ 
          padding: '10px', 
          background: '#e8f5e8', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          成功: {data}
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: '10px', 
          background: '#ffebee', 
          color: 'red',
          borderRadius: '4px'
        }}>
          错误: {error}
        </div>
      )}
      
      <p style={{ fontSize: '12px', color: '#666' }}>
        注意: 此示例有 70% 的失败率用于演示重试机制
      </p>
    </div>
  )
}

// 4. 缓存管理组件
const CacheExample: React.FC = () => {
  const { 
    setCache, 
    getCache, 
    clearCache, 
    isExpired, 
    getCacheInfo 
  } = useCacheStore()
  
  const [cacheKey, setCacheKey] = useState('')
  const [cacheValue, setCacheValue] = useState('')
  const [ttl, setTtl] = useState(30000) // 30秒
  const [retrievedValue, setRetrievedValue] = useState<any>(null)
  
  const handleSetCache = () => {
    if (cacheKey && cacheValue) {
      setCache(cacheKey, cacheValue, ttl)
      setCacheKey('')
      setCacheValue('')
    }
  }
  
  const handleGetCache = () => {
    if (cacheKey) {
      const value = getCache(cacheKey)
      setRetrievedValue(value)
    }
  }
  
  const handleClearCache = () => {
    if (cacheKey) {
      clearCache(cacheKey)
    } else {
      clearCache()
    }
    setRetrievedValue(null)
  }
  
  const cacheInfo = getCacheInfo()
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>缓存管理示例</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>设置缓存</h4>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="缓存键"
            value={cacheKey}
            onChange={(e) => setCacheKey(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '150px' }}
          />
          <input
            type="text"
            placeholder="缓存值"
            value={cacheValue}
            onChange={(e) => setCacheValue(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '150px' }}
          />
          <input
            type="number"
            placeholder="TTL (毫秒)"
            value={ttl}
            onChange={(e) => setTtl(parseInt(e.target.value) || 30000)}
            style={{ padding: '8px', marginRight: '10px', width: '100px' }}
          />
          <button onClick={handleSetCache}>设置缓存</button>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>获取缓存</h4>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="缓存键"
            value={cacheKey}
            onChange={(e) => setCacheKey(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '150px' }}
          />
          <button onClick={handleGetCache}>获取缓存</button>
          <button onClick={handleClearCache} style={{ marginLeft: '10px' }}>
            清除缓存
          </button>
        </div>
        
        {retrievedValue !== null && (
          <div style={{ 
            padding: '10px', 
            background: retrievedValue ? '#e8f5e8' : '#ffebee',
            borderRadius: '4px'
          }}>
            {retrievedValue ? `找到: ${retrievedValue}` : '未找到或已过期'}
          </div>
        )}
      </div>
      
      <div>
        <h4>缓存信息</h4>
        <p>缓存大小: {cacheInfo.size}</p>
        <p>缓存键: {cacheInfo.keys.join(', ') || '无'}</p>
      </div>
    </div>
  )
}

// 5. 乐观更新组件
const OptimisticUpdateExample: React.FC = () => {
  const { 
    items, 
    pendingUpdates, 
    addItem, 
    updateItem, 
    deleteItem,
    clearPendingUpdates 
  } = useOptimisticStore()
  
  const [newItemName, setNewItemName] = useState('')
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  
  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem({ name: newItemName, completed: false })
      setNewItemName('')
    }
  }
  
  const handleUpdateItem = (id: string) => {
    if (editValue.trim()) {
      updateItem(id, { name: editValue })
      setEditingItem(null)
      setEditValue('')
    }
  }
  
  const handleDeleteItem = (id: string) => {
    deleteItem(id)
  }
  
  const startEdit = (id: string, currentName: string) => {
    setEditingItem(id)
    setEditValue(currentName)
  }
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>乐观更新示例</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>添加项目</h4>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="项目名称"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <button onClick={handleAddItem}>添加</button>
        </div>
      </div>
      
      {pendingUpdates.length > 0 && (
        <div style={{ 
          padding: '10px', 
          background: '#fff3cd', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h4>待处理更新 ({pendingUpdates.length})</h4>
          {pendingUpdates.map((update) => (
            <div key={update.id} style={{ fontSize: '12px' }}>
              {update.type}: {update.data.name || update.data.id}
            </div>
          ))}
          <button onClick={clearPendingUpdates} style={{ marginTop: '10px' }}>
            清除待处理更新
          </button>
        </div>
      )}
      
      <div>
        <h4>项目列表</h4>
        {items.length === 0 ? (
          <p>暂无项目</p>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '5px',
                border: '1px solid #eee',
                margin: '5px 0',
                borderRadius: '4px'
              }}>
                {editingItem === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUpdateItem(item.id)}
                      style={{ flex: 1, padding: '4px' }}
                    />
                    <button onClick={() => handleUpdateItem(item.id)}>保存</button>
                    <button onClick={() => setEditingItem(null)}>取消</button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <button onClick={() => startEdit(item.id, item.name)}>编辑</button>
                    <button onClick={() => handleDeleteItem(item.id)}>删除</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 6. 主应用组件
const AsyncOperationsDemo: React.FC = () => {
  return (
    <div>
      <h2>Zustand 异步操作和副作用示例</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <UserList />
          <UserProfile />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <ApiRetryExample />
          <CacheExample />
          <OptimisticUpdateExample />
        </div>
      </div>
    </div>
  )
}

export default AsyncOperationsDemo
