
import React, { Component } from 'react'


export default class Search extends Component {
state = {
    list:[]
}
  handleSearch = () => {
    console.log('搜索')
    //连续解构 赋值
    const {inputRef:{value:val}} = this
    console.log(val)
    this.props.request_data(val)

  }

  render() {
    return (
      <div>
        <input type="text" placeholder='输入' ref={(c)=>this.inputRef=c}/> 
        <button onClick={this.handleSearch}>搜索</button>
        </div>
    )
  }
}