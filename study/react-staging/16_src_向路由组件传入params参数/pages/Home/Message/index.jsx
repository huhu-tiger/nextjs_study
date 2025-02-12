import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {
    state = {
        messageArr: [
            {id: '001', title: 'message001'},
            {id: '002', title: 'message002'},
            {id: '003', title: 'message003'}
        ]
    }
  render() {
    return (
      <div>
        <ul>
            <li>
                {this.state.messageArr.map((msgObj) => {
                    return <li key={msgObj.id}>
                        <Link to={`detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                        </li>
                })}
            </li>
        </ul>
        <hr/>
        <Routes>
            <Route path="detail/:id/:title" element={<Detail/>} />
        </Routes>
      </div>
    )
  }
}