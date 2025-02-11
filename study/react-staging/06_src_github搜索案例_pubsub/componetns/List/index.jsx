import './index.css'
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class List extends Component {
  state = {
    list:[],
    isLoading:false,
    errMsg:'',
    isFirst:true
}

  
  componentDidMount(){
    this.token = PubSub.subscribe('MY TOPIC', this.mySubscriber);
  }
  componentWillUnmount(){
    PubSub.unsubscribe(this.token)
  }

  mySubscriber =  (msg, data)=> {
    console.log( msg, data );
    this.setState(data)
  };



  handleClick = (item) => {
    console.log(item)
    window.open(item.html_url, '_blank')
  }

  render() {
    // const { images } = this.state
    const {list,isLoading,errMsg} = this.state
    console.log(list)


    return (
      <div className="row">
        {/* 三元运算符  嵌套*/}
        {isLoading ? <h2>Loading...</h2> : errMsg ? <h2>{errMsg}</h2> : list.map((item, index) => (
          <div key={index} className="card-group">
              <div key={item.id} className="card" >
                <a href={item.html_url} target="_blank">
                <img 
                  src={item.avatar_url} 
                  className="card-img" 
                  alt={`React Logo ${item.index}`}

                />
                </a>
                <p>{item.login}</p>
              </div>
          </div>
        ))}
      </div>
    )
  }
}