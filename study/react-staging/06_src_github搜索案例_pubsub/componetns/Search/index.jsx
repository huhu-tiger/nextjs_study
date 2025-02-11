import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

  request_data = (val) => {
    PubSub.publish('MY TOPIC', {
      list: [],
      isLoading: true,
      errMsg: ''
    });
    let data = []
    axios.get(`https://api.github.com/search/users?q=${val}`).then(
      res => {
        data = res.data.items

        PubSub.publish('MY TOPIC', {
          list: data,
          isLoading: false,
          errMsg: ''
        });

      }, err => {
        console.log(err)
        PubSub.publish('MY TOPIC', {
          isLoading: false,
          errMsg: err.message
        })
      }
    )

  }
  handleSearch = () => {
    console.log('搜索')
    //连续解构 赋值
    const { inputRef: { value: val } } = this
    console.log(val)
    this.request_data(val)

  }

  render() {
    return (
      <div>
        <input type="text" placeholder='输入' ref={(c) => this.inputRef = c} />
        <button onClick={this.handleSearch}>搜索</button>
      </div>
    )
  }
}