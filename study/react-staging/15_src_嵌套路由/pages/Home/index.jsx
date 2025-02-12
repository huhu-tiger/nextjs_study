import React, { Component } from 'react'
import { Route, Routes, NavLink, Navigate } from 'react-router-dom'
import News from './News'
import Message from './Message'
import MyNavLink from '../../components/MyNavLink'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        {/* 导航区 */}
        <ul className="nav nav-tabs">
          <li>
            <MyNavLink to="/home/news">News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/message">Message</MyNavLink>
          </li>
        </ul>
        
        {/* 注册路由 */}
        <div style={{marginTop: '20px'}}>
          <Routes>
            {/* 使用相对路径，不需要/home前缀 */}
            <Route path="news" element={<News/>} />
            <Route path="message" element={<Message/>} />
            <Route path="*" element={<Navigate to="news" replace />} />
          </Routes>
        </div>
      </div>
    )
  }
}
