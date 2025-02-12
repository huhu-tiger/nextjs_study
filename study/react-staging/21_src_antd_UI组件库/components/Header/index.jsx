import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'

function Button() {
  const navigate = useNavigate()

  return (
    <div>

      <button onClick={() => navigate(1)}>前进</button>
      <button onClick={() => navigate(-1)}>后退</button>
    </div>
  )
}


export default class index extends Component {


  render() {
    return (
      <div><h2>React Router Demo</h2>
        <Button/>
      </div>

    )
  }
}

