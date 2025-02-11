import React, { Component } from 'react'
import Search from './componetns/Search'
import List from './componetns/List'
import axios from 'axios'

export default class App extends Component {
    state = {
        list:[]
    }
    request_data = (val)=>{
        let data = []
        axios.get(`https://api.github.com/search/users?q=${val}`).then(
            res=>{
                res.data.items.forEach(item=>{
                    console.log(item)
                    data.push(item)
                    this.setState({
                        list:data
                    })
                })
            },err=>{
                console.log(err)
            }
        )

      }
  render() {
    return (
      <div>
        <Search request_data={this.request_data}/>
        <List list={this.state.list}/>
      </div>
    )
  }
}