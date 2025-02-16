import React, { Component } from 'react'

export default class index extends Component {

    selectNumber = React.createRef()
    
    state = {
        count:0
    }
    increment = () => {
        const {value} = this.selectNumber.current
        console.log(value)
        this.setState(state => ({count: state.count + value*1}))
    }
    decrement = () => {
        const {value} = this.selectNumber.current
        console.log(value)
        this.setState(state => ({count: state.count - value*1}))
    }
    incrementIfOdd = () => {
        const {count} = this.state
        if(count % 2 !== 0){
            this.increment(count)
        }
    }
    incrementAsync = async() => {
        this.increment(this.selectNumber.current.value*1)
    }

    render() {
        return (
            <div>
                <h1>当前求和为：{this.state.count}</h1>
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
