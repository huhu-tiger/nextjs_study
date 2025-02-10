import React, { Component } from 'react'
import Item from '../Item'
export default class index extends Component {
  render() {
    const { list, handleChange, handleDelete } = this.props
    return <div>        
        <table className="table table-bordered table-hover">
    <ul>
      {
        list.map((item) => (
            <Item key={item.id} item={item} handleChange={handleChange} handleDelete={handleDelete} />
        ))
      }
    </ul>
  </table>
  </div>
  }
}