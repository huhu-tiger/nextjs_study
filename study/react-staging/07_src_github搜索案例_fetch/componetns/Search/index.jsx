import PubSub from 'pubsub-js'
import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

  request_data = async (val) => {
    PubSub.publish('MY TOPIC', {
      list: [],
      isLoading: true,
      errMsg: ''
    });
    // let data = []
    // 发送请求-axios
    // axios.get(`https://api.github.com/search/users?q=${val}`).then(
    //   res => {
    //     data = res.data.items

    //     PubSub.publish('MY TOPIC', {
    //       list: data,
    //       isLoading: false,
    //       errMsg: ''
    //     });

    //   }, err => {
    //     console.log(err)
    //     PubSub.publish('MY TOPIC', {
    //       isLoading: false,
    //       errMsg: err.message
    //     })
    //   }
    // )
    // 发送请求-fetch  --- 未优化
    // fetch(`https://api.github.com/search/users?q=${val}`)
    //   .then((response) => {
    //     console.log(response)
    //     if(response.ok){
    //       return response.json()
    //     }else{
    //       throw new Error('请求失败')
    //     }
    //   })
    //   .then(data => {
    //     console.log(data)
    //   })
    //   .catch(error => console.error('Error:', error))

    // 发送请求-fetch  --- 优化
    // fetch(`https://api.github.com/search/users?q=${val}`)
    //   .then((response) => {
    //     console.log(response)
    //     if(response.ok){
    //       return response.json()
    //     }
    //   })
    //   .then(data => {
    //     PubSub.publish('MY TOPIC', {
    //       list: data.items,
    //       isLoading: false,
    //       errMsg: ''
    //     })
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //     PubSub.publish('MY TOPIC', {
    //       isLoading: false,
    //       errMsg: error.message
    //     })
    //   })
 

    // 发送请求-fetch  --- 优化  需要async await
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${val}`)
      const data = await response.json()
      console.log(data)
      PubSub.publish('MY TOPIC', {
        list: data.items,
        isLoading: false,
        errMsg: ''
      })
    } catch (error) {
      console.error('Error:', error)
      PubSub.publish('MY TOPIC', {
        isLoading: false,
        errMsg: error.message
      })
    }

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