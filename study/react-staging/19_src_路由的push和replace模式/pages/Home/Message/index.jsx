import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Detail from './Detail'

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
                        {/* </li> */}
                        {/* 使用search 传参 */}
                        {/* <Link to={{
                            pathname: `/home/message/detail`,
                            search: `?id=${msgObj.id}&title=${msgObj.title}`
                        }}>{msgObj.title}</Link> */}
                        {/* 使用state 传参 */}
                        <Link replace={true} to={`detail`} state={{id: msgObj.id, title: msgObj.title}}>{msgObj.title}</Link>
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
      </div>
    )
  }
}