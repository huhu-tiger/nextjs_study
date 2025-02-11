
import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
state = {
    list:[]
}
request_data = (val)=>{
  this.setState({
      isLoading:true,
      errMsg:'',
      isFirst:false
  })
  let data = []
  axios.get(`https://api.github.com/search/users?q=${val}`).then(
      res=>{
          res.data.items.forEach(item=>{
              console.log(item)
              data.push(item)
              this.props.updateAppState({
                  list:data,
                  isLoading:false,
                  errMsg:''
              })
          })
      },err=>{
          console.log(err)
          this.props.updateAppState({
              isLoading:false,
              errMsg:err.message
          })
      }
  )

}
  handleSearch = () => {
    console.log('搜索')
    //连续解构 赋值
    const {inputRef:{value:val}} = this
    console.log(val)
    this.request_data(val)

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