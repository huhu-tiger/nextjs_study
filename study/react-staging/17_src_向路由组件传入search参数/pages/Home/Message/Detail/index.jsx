import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'



export default function Detail() {
  // 获取params 所有路由参数
//   const params = useParams()
//   console.log('所有参数:', params)

  // 获取查询参数
  const [search, setSearch] = useSearchParams()
  console.log('查询参数:', search.get('id'))

  return (
    <ul>
      <li>ID: {search.get('id')}</li>
      <li>TITLE: {search.get('title')}</li>
    </ul>
  )
}
