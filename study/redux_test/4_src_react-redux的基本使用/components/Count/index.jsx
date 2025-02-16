import React, { Component } from 'react'

export default class Count extends Component {
    selectNumber = React.createRef()

    increment = () => {
        const {value} = this.selectNumber.current
        // 使用 dispatch 函数 调用 increment 函数
        this.props.dispatchIncrement(value*1)
    }
    

    decrement = () => {
        const {value} = this.selectNumber.current
        this.props.dispatchDecrement(value*1)
    }

    incrementIfOdd = () => {
        const {value} = this.selectNumber.current
        if(this.props.count % 2 !== 0){
            this.props.dispatchIncrement(value*1)
        }
    }

    incrementAsync = () => {
        const {value} = this.selectNumber.current
        this.props.dispatchIncrementAsync(value*1, 500)
    }

    render() {
        console.log(this.props)
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

