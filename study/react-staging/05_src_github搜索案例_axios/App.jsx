import React, { Component } from 'react'
import Search from './componetns/Search'
import List from './componetns/List'


export default class App extends Component {
    state = {
        list:[],
        isLoading:false,
        errMsg:'',
        isFirst:true
    }
 updateAppState = (stateObj)=>{
    this.setState(stateObj)
 }
  render() {
    return (
      <div>
        <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
      </div>
    )
  }
}