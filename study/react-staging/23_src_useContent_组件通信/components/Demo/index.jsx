import React, { Component, useEffect, useContext } from 'react'
import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import B from './b'
import { Mycontext } from './context'

class Demo extends Component {
    state = {
        name1: '李四',
        age: 18
    }
    render() {
        return (
        <div>
            我的名字是：{this.state.name1}
            <Mycontext.Provider value={{name:this.state.name1,age:this.state.age}}>
                <A />
            </Mycontext.Provider>
        </div>
    )
    }
}

class A extends Component {
    static contextType = Mycontext
    render() {
        console.log(this.context)
        return <div>我是A组件,我的名字是：{this.context.name}，我的年龄是：{this.context.age}
        <B />
        <C />
        </div>
    }
}
// 函数使用useContext获取上下文
function C() {
    const context = useContext(Mycontext)
    return <div>我是C组件,我的名字是：{context.name}，我的年龄是：{context.age}</div>
}

export default Demo