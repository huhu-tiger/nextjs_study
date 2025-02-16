import { Mycontext } from './context'
import { Component } from 'react'


class B extends Component {
    static contextType = Mycontext
    render() {
        return <div>我是B组件,我的名字是：{this.context.name}，我的年龄是：{this.context.age}</div>
    }
}   

export default B