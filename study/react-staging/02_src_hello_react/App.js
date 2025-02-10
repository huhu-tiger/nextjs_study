// 引入react
import React, { Component } from 'react';
// 引入react-dom
import ReactDOM from 'react-dom';

// 引入组件
import Hello from './components/Hello';
import Welcome from './components/Welcome';

// 创建并暴露组件
export default class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <Welcome />
      </div>
    )
  }
}
