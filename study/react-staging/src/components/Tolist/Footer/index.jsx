import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    const { list, doneList } = this.props
    return (
      <div>       
        <span>已完成{doneList.length}个</span>/
          <span>全部{list.length}个</span>
          </div>
    )
  }
}
