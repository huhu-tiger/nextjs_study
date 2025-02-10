import React, { Component } from 'react'
import List from './List'
import Footer from './Footer'
import Header from './Header'
export default class index extends Component {
  state = {
    list: [
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
  handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        list: [{ id: this.state.list.length + 1, name: e.target.value,isDone:false },...this.state.list]
      })
      e.target.value = ''
    }
  }
  handleChange = (e) => {
    console.log(e.target.id,e.target.checked)
    this.setState({
      list: this.state.list.map(item => {
        if (parseInt(item.id) === parseInt(e.target.id)) {
          console.log(item)
          item.isDone = e.target.checked
        }

        return item
      })
    })
  }
  handleDelete = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  render() {
    const { list } = this.state
    const doneList = list.filter(item => item.isDone)
    console.log(list)
    return (
      <div>
        <Header handleKeyUp={this.handleKeyUp} />
        <List list={list} handleChange={this.handleChange} handleDelete={this.handleDelete} />

        <Footer list={list} doneList={doneList} />
      </div>
    )
  }
}
