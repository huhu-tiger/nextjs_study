import React, { Component, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { increment, decrement, incrementAsync } from '../../redux/actions/count'

// class Count extends Component {
//     selectNumber = React.createRef()

//     increment = () => {
//         const {value} = this.selectNumber.current
//         // 使用 dispatch 函数 调用 increment 函数
//         this.props.dispatchIncrement(value*1)
//     }

//     decrement = () => {
//         const {value} = this.selectNumber.current
//         this.props.dispatchDecrement(value*1)
//     }

//     incrementIfOdd = () => {
//         const {value} = this.selectNumber.current
//         if(this.props.count % 2 !== 0){
//             this.props.dispatchIncrement(value*1)
//         }
//     }

//     incrementAsync = () => {
//         const {value} = this.selectNumber.current
//         this.props.dispatchIncrementAsync(value*1, 500)
//     }

//     render() {
//         console.log(this.props)
//         return (
//             <div>
//                 <h1>我是Count组件</h1>
//                 <h3>当前求和为：{this.props.count}</h3>
//                 <select ref={this.selectNumber}>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                 </select>
//                 &nbsp;
//                 <button onClick={this.increment}>+</button>&nbsp;   
//                 <button onClick={this.decrement}>-</button>&nbsp;
//                 <button onClick={this.incrementIfOdd}>当前求和为奇数时再加</button>&nbsp;
//                 <button onClick={this.incrementAsync}>异步加</button>
//                 <h2>下方组件总人数为：{this.props.persons.length}</h2>
//             </div>
//         )
//     }
// }

//没使用redux
// const Count = (props) => {
//     const [count, setCount] = useState(0)
//     const selectNumber = useRef()

//     const increment = () => {
//         const {value} = selectNumber.current
//         // 使用 dispatch 函数 调用 increment 函数
//         setCount(count + value*1)
//         // this.props.dispatchIncrement(value*1)
//     }

//     const decrement = () => {
//         const {value} = selectNumber.current
//         setCount(count - value*1)
//         // this.props.dispatchDecrement(value*1)
//     }

//     const incrementIfOdd = () => {
//         const {value} = selectNumber.current
//         if(count % 2 !== 0){
//             setCount(count + value*1)
//         }
//         // if(this.props.count % 2 !== 0){
//         //     // this.props.dispatchIncrement(value*1)
//         // }
//     }

//     const incrementAsync = () => {
//         const {value} = selectNumber.current
//         setTimeout(()=>{
//             setCount(count + value*1)
//         }, 500)
//         // this.props.dispatchIncrementAsync(value*1, 500)
//     }

//     return (
//         <div>
//             <h1>我是Count组件</h1>
//             <h3>当前求和为：{count}</h3>
//             <select ref={selectNumber}>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//             </select>
//             &nbsp;
//             <button onClick={increment}>+</button>&nbsp;
//             <button onClick={decrement}>-</button>&nbsp;
//             <button onClick={incrementIfOdd}>当前求和为奇数时再加</button>&nbsp;
//             <button onClick={incrementAsync}>异步加</button>
//             {/* <h2>下方组件总人数为：{this.props.persons.length}</h2> */}
//         </div>
//     )
// }

const Count = (props) => {
    // const [count, setCount] = useState(0)
    const selectNumber = useRef()

    const increment = () => {
        const {value} = selectNumber.current
        // 使用 dispatch 函数 调用 increment 函数
        // setCount(count + value*1)
        props.dispatchIncrement(value*1)
    }

    const decrement = () => {
        const {value} = selectNumber.current
        // setCount(count - value*1)
        props.dispatchDecrement(value*1)
    }

    const incrementIfOdd = () => {
        const {value} = selectNumber.current
        // if(count % 2 !== 0){
        //     setCount(count + value*1)
        // }
        if(props.count % 2 !== 0){
            props.dispatchIncrement(value*1)
        }
    }

    const incrementAsync = () => {
        const {value} = selectNumber.current

        props.dispatchIncrementAsync(value*1, 500)
    }

    return (
        <div>
            <h1>我是Count组件</h1>
            <h3>当前求和为：{props.count}</h3>
            <select ref={selectNumber}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            &nbsp;
            <button onClick={increment}>+</button>&nbsp;
            <button onClick={decrement}>-</button>&nbsp;
            <button onClick={incrementIfOdd}>当前求和为奇数时再加</button>&nbsp;
            <button onClick={incrementAsync}>异步加</button>
            <h2>下方组件总人数为：{props.persons.length}</h2>
        </div>
    )
}


const mapStateToProps = (state) => ({
    count: state.count,
    persons: state.persons
})

const mapDispatchToProps = {
    dispatchIncrement: increment,
    dispatchDecrement: decrement,
    dispatchIncrementAsync: incrementAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)