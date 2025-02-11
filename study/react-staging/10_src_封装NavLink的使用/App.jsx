import React, { Component } from 'react'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import './App.css'
import MyNavLink from './components/MyNavLink'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        {/* 头部 */}
        <div className='row'>
          <div className='col-xs-12'>
            <div className='page-header'>
              <Header/>
            </div>
          </div>
        </div>
        
        {/* 主体内容区 */}
        <div className='row'>
          {/* 左侧导航 */}
          <div className='col-xs-2'>
            <div className='list-group'>
              {/*
              原生html中，使用a标签进行页面跳转
              <a href='/about'>About</a>
              <a href='/home'>Home</a>
              */}
              {/* 使用react-router-dom中的Link组件进行页面跳转 */}
              {/* <NavLink 
                className={({isActive}) => isActive ? 'list-group-item demo' : 'list-group-item'}
                to="/about"
              >
                About
              </NavLink>
              <NavLink 
                className={({isActive}) => isActive ? 'list-group-item demo' : 'list-group-item'}
                to="/home"
              >
                Home
              </NavLink> */}
              <MyNavLink to="/about" a={1} b={2}>About</MyNavLink> {/* 传递参数 About 变量名是children*/}
              <MyNavLink to="/home" >Home</MyNavLink>
            </div>
          </div>
          
          {/* 右侧内容展示区 */}
          <div className='col-xs-10'>
            <div className='panel'> 
              <div className='panel-body'>
                <Routes>
                  <Route path='/about' element={<About/>} />
                  <Route path='/home' element={<Home/>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}