import React from 'react'
import { useParams } from 'react-router-dom'

// 高阶组件，用于包装类组件并传递参数
function withRouter(WrappedComponent) {
  return function WithRouterWrapper(props) {
    const params = useParams()
    return <WrappedComponent {...props} params={params} />
  }
}

export default function Detail() {
  // 获取所有路由参数
  const params = useParams()
  console.log('所有参数:', params)

  return (
    <ul>
      <li>ID: {params.id}</li>
      <li>TITLE: {params.title}</li>
    </ul>
  )
}
