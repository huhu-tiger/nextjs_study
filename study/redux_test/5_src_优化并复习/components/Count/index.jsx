// import React, { Component } from 'react'


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
//                 <h1>当前求和为：{this.props.count}</h1>
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
//             </div>
//         )
//     }
// }


// export default Count

import React, { Component } from 'react'
import { connect } from "react-redux"
import { INCREMENT } from '../../components/store/contant'
class Count extends Component {
    increment = () => {
        this.props.increment(1)
        // this.props.dispatchIncrement(1)
    }
  render() {
    return (
      <div>当前值：{this.props.count}
      <button onClick={this.increment}>+</button>
      </div>
    )
  }
}
//把state映射到组件的props中
const mapStateToProps = (state)=>({
    count: state

}
)

const increment = (data) => ({type: INCREMENT, data:data})

const mapDispatchToProps = {
    increment: increment
}

export default connect(mapStateToProps, mapDispatchToProps)(Count)