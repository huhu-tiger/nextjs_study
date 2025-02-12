import React from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'



export default function Detail() {
  // 获取params 所有路由参数
//   const params = useParams()
//   console.log('所有参数:', params)

  // 获取查询参数
//   const [search, setSearch] = useSearchParams()
//   console.log('查询参数:', search.get('id'))

  // 获取路由信息
  const location = useLocation()
  console.log('路由信息:', location.state)

  const { id, title } = location.state || {}
  return (
    <ul>
      <li>ID: {id || '暂无数据'}</li>
      <li>TITLE: {title || '暂无数据'}</li>
    </ul>
  )
}
