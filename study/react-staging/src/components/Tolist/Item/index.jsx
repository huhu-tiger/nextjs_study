import React, { Component } from 'react'

export default class index extends Component {
  state = {
    mouseEnter: false
  }

  handleMouse = (flag) => {
    this.setState({mouseEnter: flag})
  }

  render() {
    const { item, handleChange, handleDelete } = this.props
    return (
      <div> 
        <li 
          style={{backgroundColor: this.state.mouseEnter ? '#ddd' : 'white', listStyle: 'none', display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center'}}
          onMouseEnter={() => this.handleMouse(true)}
          onMouseLeave={() => this.handleMouse(false)}
        >
          <input id={item.id} type="checkbox" checked={item.isDone} onChange={handleChange}/>
          <span style={{margin: '0 20px'}}>{item.name}</span>
          <button 
            style={{display: this.state.mouseEnter ? 'inline-block' : 'none'}}
            className="delete"
            onClick={()=>window.confirm('确定要删除吗?') && handleDelete(item.id)}
          >
            删除
          </button>
        </li>
      </div>
    )
  }
}
