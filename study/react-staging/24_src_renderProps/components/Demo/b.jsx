import { Mycontext } from './context'
import { Component } from 'react'


class B extends Component {
    // static contextType = Mycontext
    render() {
    
        return (
            <div>
            我是B组件,我的接收到的名字是：{this.props.name}
            
            </div>
            )
    }
}   

export default B