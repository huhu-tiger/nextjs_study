import React, { Component } from 'react'

export default class Item extends Component {
  state = {
    mouseEnter: false
  }

  handleMouse = (flag) => {
    this.setState({mouseEnter: flag})
  }


  updateTodo = (id) => {
    return (e)=>{
      this.props.updateTodo(id,e.target.checked)
    }
  }

  render() {
    const { item,  deleteTodo } = this.props
    return (
      <div> 
        <li 
          style={{backgroundColor: this.state.mouseEnter ? '#ddd' : 'white', listStyle: 'none', display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center'}}
          onMouseEnter={() => this.handleMouse(true)}
          onMouseLeave={() => this.handleMouse(false)}
        >
          <input id={item.id} type="checkbox" checked={item.isDone} onChange={this.updateTodo(item.id)}/>
          <span style={{margin: '0 20px'}}>{item.name}</span>
          <button 
            style={{display: this.state.mouseEnter ? 'inline-block' : 'none'}}
            className="delete"
            onClick={()=>window.confirm('确定要删除吗?') && deleteTodo(item.id)}
          >
            删除
          </button>
        </li>
      </div>
    )
  }
}
