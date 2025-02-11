import React, { Component } from 'react'
import Search from './componetns/Search'
import List from './componetns/List'
import PubSub from 'pubsub-js'

export default class App extends Component {

  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }

  render() {
    return (
      <div>
        <Search />
        <List />
      </div>
    )
  }
}