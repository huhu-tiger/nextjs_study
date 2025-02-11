import React, { Component } from 'react'

export default class Footer extends Component {
  handleClear = () => {
    this.props.handleClear()
  }
  handleCheckAll = (e) => {
    this.props.handleCheckAll(e.target.checked)
  }
  render() {
    const { todos, todos_done_lenth } = this.props
    return (
      <div>       
        <input type="checkbox" checked={todos_done_lenth === todos.length && todos.length > 0} onChange={this.handleCheckAll}/>
        <span>已完成{todos_done_lenth}个</span>/
          <span>全部{todos.length}个</span>
          <button onClick={this.handleClear}>清除已完成</button>
          </div>
    )
  }
}
