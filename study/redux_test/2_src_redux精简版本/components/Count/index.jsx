import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../store/action'

class Count extends Component {
    selectNumber = React.createRef()

    increment = () => {
        const {value} = this.selectNumber.current
        this.props.increment(value*1)
    }

    decrement = () => {
        const {value} = this.selectNumber.current
        this.props.decrement(value*1)
    }

    incrementIfOdd = () => {
        const {value} = this.selectNumber.current
        if(this.props.count % 2 !== 0){
            this.props.increment(value*1)
        }
    }

    incrementAsync = () => {
        const {value} = this.selectNumber.current
        this.props.increment(value*1)
    }

    render() {
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
                <select ref={this.selectNumber}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                &nbsp;
                <button onClick={this.increment}>+</button>&nbsp;   
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>当前求和为奇数时再加</button>&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}

// 映射状态到 props
const mapStateToProps = state => ({
    count: state
})

// 映射dispatch到 props
const mapDispatchToProps = {
    increment,
    decrement
}
// 使用 connect 连接组件和 store
export default connect(mapStateToProps, mapDispatchToProps)(Count)
