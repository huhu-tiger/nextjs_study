import React from 'react'
import { Link, Route, Routes, NavLink, Navigate } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import Test from './pages/Test'
import News from './pages/Home/News'
import Message from './pages/Home/Message'
import './App.css'
import MyNavLink from './components/MyNavLink'
import { Button, Flex, Radio, Slider } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

const App = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <Flex vertical align="center">
          <Flex justify="center">
            <Button type="primary">按钮</Button>
            <Button type="primary" danger>危险按钮</Button>
            <Button type="primary" ghost>幽灵按钮</Button>
            <Button type="primary" disabled>禁用按钮</Button>
            <Button type="primary" loading>加载中按钮</Button>
            <Button type="primary" shape="circle">圆形按钮</Button>
            <Button type="primary" shape="circle" icon={<HomeOutlined />}>搜索按钮</Button>
          </Flex>
        </Flex>
  </ConfigProvider>
);

export default App;
