import React, { Component } from 'react'
import List from './List'
import Footer from './Footer'
import Header from './Header'

// 状态在哪里，操作状态的方法就在哪里
export default class index extends Component {
  state = {
    todos: [
      {
        id: 1,
        name: '打代码',
        isDone: false
      },
      {
        id: 2,
        name: '吃饭',
        isDone: true
      },
      {
        id: 3,
        name: '睡觉',
        isDone: false
      }
    ]
  }
  addTodo = (todoobj) => {

      this.setState({
        todos: [todoobj,...this.state.todos]

    })
  }
  updateTodo = (id,checked) => {
    // console.log(e.target.id,e.target.checked)
    const newTodos= this.state.todos.map(item => {
      if (parseInt(item.id) === parseInt(id)) {
        console.log(item)
        return {...item,isDone:checked}
      }
      return item
    })
    this.setState({
      todos: newTodos
    })
  }
  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter(item => item.id !== id)
    this.setState({
      todos: newTodos
    })
  }
  handleClear = () => {
    this.setState({
      todos: this.state.todos.filter(item => !item.isDone)
    })
  }
  handleCheckAll = (checked) => {
    const {todos} = this.state
    if (checked) {
      const newTodos = todos.map(item => ({...item,isDone:true}))
      this.setState({
        todos: newTodos
      })
    } else {
      const newTodos = todos.map(item => ({...item,isDone:false}))
      this.setState({
        todos: newTodos
      })
    }
  }
  render() {
    const { todos } = this.state
    const todos_done_lenth = todos.reduce((pre,cur)=>{
      return pre + (cur.isDone ? 1 : 0)
    },0)
    console.log(todos)
    return (
      <div>
        <Header addTodo={this.addTodo} todos={todos}/>
        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />

        <Footer todos={todos} todos_done_lenth={todos_done_lenth} handleClear={this.handleClear} handleCheckAll={this.handleCheckAll}/>
      </div>
    )
  }
}
