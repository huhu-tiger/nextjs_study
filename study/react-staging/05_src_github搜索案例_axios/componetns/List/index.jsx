import './index.css'
import React, { Component } from 'react'

export default class List extends Component {
  handleClick = (item) => {
    console.log(item)
    window.open(item.html_url, '_blank')
  }

  render() {
    // const { images } = this.state
    const {list,isLoading,errMsg} = this.props
    console.log(list)
    if(isLoading){
      return <h2>Loading...</h2>
    }
    if(errMsg){
      return <h2>{errMsg}</h2>
    }

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