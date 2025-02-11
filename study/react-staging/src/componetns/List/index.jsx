import './index.css'
import React, { Component } from 'react'

export default class List extends Component {

  render() {
    // const { images } = this.state
    const {list} = this.props
    console.log(list)
    // 将图片数组分组，每组3个
    // const rows = []
    // for (let i = 0; i < images.length; i += 3) {
    //   rows.push(images.slice(i, i + 3))
    // }

    return (
      <div className="row">
        {list.map((item, index) => (
          <div key={index} className="card-group">
              <div key={item.id} className="card">
                <img 
                  src={item.avatar_url} 
                  className="card-img" 
                  alt={`React Logo ${item.index}`}
                />
                <p>{item.login}</p>
              </div>
          </div>
        ))}
      </div>
    )
  }
}