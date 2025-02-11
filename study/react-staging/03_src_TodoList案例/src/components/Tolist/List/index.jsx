import React, { Component } from 'react'
import Item from '../Item'
import PropTypes from 'prop-types'
export default class List extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }
  render() {
    const { todos, updateTodo, deleteTodo } = this.props
    return <div>        
    <ul>
      {
        todos.map((item) => (
            <Item key={item.id} item={item} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        ))
      }
    </ul>
  
  </div>
  }
}