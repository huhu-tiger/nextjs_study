import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
export default class index extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired
  }
  handleChange= (e) => {
    console.log(e.target.value)
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const obj={ id: nanoid(), name: e.target.value,isDone:false }
      console.log(obj)
      this.props.addTodo(obj)
      e.target.value = ''
    }
  }

  render() {

    return (
      <div>    
        <input type="text" placeholder="请输入你的任务,按回车键确认" onKeyUp={this.handleChange} />
        </div>
    )
  }
}
