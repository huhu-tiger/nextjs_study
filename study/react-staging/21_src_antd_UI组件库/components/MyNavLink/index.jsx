import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class index extends Component {
  render() {
    // const {children} = this.props
    console.log(this.props)
    return (

      <NavLink 
      className={({isActive}) => isActive ? 'list-group-item demo' : 'list-group-item'} 
      {...this.props}
      >
        {/*children 是传递的参数 已经放在this.props中*/}
      </NavLink>

    )
  }
}
