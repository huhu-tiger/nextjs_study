import React, { Component, useEffect } from 'react'
import { useState,useRef } from 'react'
import ReactDOM from 'react-dom'


// class Demo extends Component {
//     inputRef = React.createRef()
//     state = {
//       count: 0
//     }
//     componentDidMount() {
//       this.timer = setInterval(() => {
//         this.setState({count: this.state.count + 1})
//       }, 1000)
//     }
//     componentWillUnmount() {
//       clearInterval(this.timer)
//     }
//     add = () => {
//       this.setState({count: this.state.count + 1})
//     }
//     unmount = () => {
//       ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
    
//     show = (c) => {
   
//       alert(this.inputRef.current.value)
//     }
//     render() {
//       return (
//         <div>
//             <input type="text" ref={this.inputRef} />
//           <h2>当前求和为：{this.state.count}</h2>
//           <button onClick={this.add}>点我加1</button>
//           <button onClick={this.unmount}>点我卸载</button>
//           <button onClick={this.show}>点击提示数据</button>
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
    const [count, setCount] = useState(0)
    const myRef = useRef()
     /*
     语法: useEffect(() => {
        // 在此可以执行任何的副作用操作
        // 依赖项发生变化时，会重新执行
        // 依赖项为空时，只会执行一次
        // 依赖项为空时，会执行两次
     }, [监听项])   如果监听的属性为空，则只会执行一次
    */
     useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => { // 在组件卸载时执行
            clearInterval(timer)
        }
    }, [count])

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

    const unmount = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    const show = () => {
        alert(myRef.current.value)
    }

    return (
        <div>
            <input type="text" ref={myRef} />
          <h2>当前求和为：{count}</h2>
          <button onClick={add}>点我加1</button>
          <div>
            {name}
          </div>
          <button onClick={changeName}>点我改名</button>
          <button onClick={unmount}>点我卸载</button>
          <button onClick={show}>点击提示数据</button>
        </div>
      )
    }
  

export default Demo