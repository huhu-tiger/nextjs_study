import React, { Component } from 'react'
import { useState } from 'react'
// class Demo extends Component {
//     state = {
//       count: 0
//     }
//     add = () => {
//       // setState 接收一个函数作为参数,该函数接收当前的state作为参数
//       // 返回一个对象,该对象会与当前state进行合并
//       // 这里的写法有问题,应该返回一个对象 {count: state.count + 1}

//       this.setState(state => {
//         console.log(state)
//         return {count: state.count + 1}
//       })
//     }
//     render() {
//       return (
//         <div>
//           <h2>当前求和为：{this.state.count}</h2>
//           <button onClick={this.add}>点我加1</button>
//         </div>
//       )
//     }
//   }

function Demo() {
    /*
     语法: const [xxx, setXxx] = useState(初始值)
     返回值: 数组
     第一个为状态值
     第二个为修改状态值的函数
    */    
    const [age, setAge] = useState({a:1, b:2})
    const [count, setCount] = useState(0)
    const [name, setName] = useState('tao')
    const add = () => {
        // setCount(count + 1)
        setCount((count) => {
            console.log(count)
            return count + 1
        })
    }

    const changeName = () => {
        setName('tao1')
    }

    const changeAge = () => {
        setAge({a:3, b:2})
    }

    return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={add}>点我加1</button>
          <div>
            {name}
          </div>
          <button onClick={changeName}>点我改名</button>
          <div>
            {age.a}
          </div>
          <button onClick={changeAge}>点我改年龄</button>
        </div>
      )
    }
  

export default Demo