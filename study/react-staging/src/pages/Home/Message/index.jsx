import React, { Component } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import Detail from './Detail'

// 创建一个函数组件来处理导航
function NavigateButton({ path }) {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate(path, { replace: true })}>
                replace查看
            </button>
            <button onClick={() => navigate(path)}>push查看</button>
        </>
    )
}

function NavigateButton2({ path, state }) {
    const navigate = useNavigate()
    return (
        <>
        <button onClick={() => navigate(path, { state })} replace={true}>
            replace查看
        </button>
            <button onClick={() => navigate(path, { state })}>
                push查看
            </button>
        </>
    )
}

// 前进后退按钮组件
function NavigationButtons() {
    const navigate = useNavigate()
    return (
        <>
            <button onClick={() => navigate(-1)}>返回</button>
            <button onClick={() => navigate(1)}>前进</button>
        </>
    )
}

export default class Message extends Component {
    
    state = {
        messageArr: [
            {id: '001', title: 'message001'},
            {id: '002', title: 'message002'},
            {id: '003', title: 'message003'}
        ]
    }

  render() {
    return (
      <div>
        <ul>
            <li>
                {this.state.messageArr.map((msgObj) => {
                    return <li key={msgObj.id}>
                        {/* 使用params 传参 */}
                        {/* <Link to={`detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}
                        {/* &nbsp; */}
                        {/* 使用编程式导航 传params 参数 */}
                        {/* <NavigateButton path={`/home/message/detail/${msgObj.id}/${msgObj.title}`} /> */}

                        {/* </li> */}
                        {/* 使用search 传参 */}
                        {/* <Link to={{
                            pathname: `/home/message/detail`,
                            search: `?id=${msgObj.id}&title=${msgObj.title}`
                        }}>{msgObj.title}</Link> */}
                        {/* 使用编程式导航 传search 参数 */}
                        {/* <NavigateButton path={`/home/message/detail?id=${msgObj.id}&title=${msgObj.title}`} /> */}

                        {/* 使用state 传参 */}
                        <Link to={`detail`} state={{id: msgObj.id, title: msgObj.title}}>{msgObj.title}</Link>

                        {/* 使用编程式导航 传search 参数 */}
                        <NavigateButton2 path={`/home/message/detail`} state={{id: msgObj.id, title: msgObj.title}} />
                        </li>
                })}
            </li>
        </ul>
        <hr/>
        <Routes>
            {/* 使用params 传参 */}
            {/* <Route path="detail/:id/:title" element={<Detail/>} /> */}
            {/* 使用search 传参 ,使用useSearchParams 获取查询参数 */}
            {/* <Route path="detail" element={<Detail/>} /> */}
            {/* 使用state 传参 ,使用useLocation 获取路由信息 */}
            <Route
            path="detail"
            element={<Detail/>} 
            />
        </Routes>
        <NavigationButtons />
      </div>
    )
  }
}