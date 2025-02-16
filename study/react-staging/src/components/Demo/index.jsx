import React, { Component, useEffect, useContext } from 'react'
import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import B from './b'
import { Mycontext } from './context'

class Demo extends Component {
    state = {
        name1: '张三',
        Aname1: '李四',
        Bname: '王五'
    }
    render() {
        return (
            <div>
                我是父组件
                父组件的名字是：{this.state.name1}
                <A render={(name=this.state.Aname1)=>{return <B name={this.state.Bname} />}}  />
            </div>
        )
    }
}

class A extends Component {
    // static contextType = Mycontext
    state = {
        name: '张三',
        age: 18
    }
    render() {
        // console.log(this.context)
        console.log(this.props)
        return <div>
            <hr />
            "我是A组件"
            A组件自身的名字是: {this.state.name} <br/>
            A组件接收到父组件的名字是: {this.props.name}
            {this.props.render(this.state.name)}
            <hr />

        </div>
    }
}
// 函数使用useContext获取上下文
// function C() {
//     const context = useContext(Mycontext)
//     return <div>我是C组件,我的名字是：{context.name}，我的年龄是：{context.age}</div>
// }

export default Demo