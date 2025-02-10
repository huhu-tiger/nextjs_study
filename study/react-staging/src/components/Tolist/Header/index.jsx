import React, { Component } from 'react'

export default class index extends Component {

  render() {
    const { handleKeyUp } = this.props
    return (
      <div>      <input type="text" placeholder="请输入你的任务,按回车键确认" onKeyUp={handleKeyUp} /></div>
    )
  }
}
