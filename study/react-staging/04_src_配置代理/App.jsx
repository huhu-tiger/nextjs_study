import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
    handleClick = () => {
        axios.get('https://jsonplaceholder.typicode.com/users').then(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}
