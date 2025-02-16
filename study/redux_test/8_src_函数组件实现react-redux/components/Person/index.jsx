import React, { Component, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../../redux/actions/person'
import { nanoid } from 'nanoid'

// class Person extends Component {
//     nameNode = React.createRef()
//     ageNode = React.createRef()

//     addPerson = () => {
//         const name = this.nameNode.current.value
//         const age = this.ageNode.current.value
//         const personObj = { id: nanoid(), name, age }
//         this.props.addPerson(personObj)
//         this.nameNode.current.value = ''
//         this.ageNode.current.value = ''
//     }

//     render() {
//         console.log(this.props)
//         return (
//             <div>
//                 <h2>我是Person组件,上方组件求和为:{this.props.count}</h2>
//                 <input ref={this.nameNode} type="text" placeholder="输入名字" />
//                 <input ref={this.ageNode} type="text" placeholder="输入年龄" />
//                 <button onClick={this.addPerson}>添加</button>
//                 <ul>
//                     {this.props.persons.map(p => (
//                         <li key={p.id}>
//                             姓名：{p.name} -- 年龄：{p.age}
//                         </li>
//                     ))}
//                 </ul>
//                 <h2>上方组件求和为：{this.props.count}</h2>
//             </div>
//         )
//     }
// }

// 没使用redux
// function Person(props) {

//     const [persons, setpersons] = useState([])
//     const nameNode = useRef()
//     const ageNode = useRef()

//     const addPerson = () => {
//         const personObj = { id: nanoid(), name: nameNode.current.value, age: ageNode.current.value }
//         setpersons([ personObj,...persons])
//         props.addPerson(personObj)
//         nameNode.current.value = ''
//         ageNode.current.value = ''
//     }
//     return (
//         <div>
//             {/* <h2>我是Person组件,上方组件求和为:{this.props.count}</h2> */}
//             <input ref={nameNode} type="text" placeholder="输入名字" />
//             <input ref={ageNode} type="text" placeholder="输入年龄" />
//             <button onClick={addPerson}>添加</button>
//             <ul>
//                 {persons.map(p => (
//                     <li key={p.id}>
//                         姓名：{p.name} -- 年龄：{p.age}
//                     </li>
//                 ))}
//             </ul>
//             {/* <h2>上方组件求和为：{count}</h2> */}
//         </div>
//     )
// }

const Person = (props) => {

    // const [persons, setpersons] = useState([])
    const nameNode = useRef()
    const ageNode = useRef()

    const addPerson = () => {
        const personObj = { id: nanoid(), name: nameNode.current.value, age: ageNode.current.value }
        // setpersons([ personObj,...persons])
        props.addPerson(personObj)
        nameNode.current.value = ''
        ageNode.current.value = ''
    }
    return (
        <div>
            {/* <h2>我是Person组件,上方组件求和为:{this.props.count}</h2>        */}
            <input ref={nameNode} type="text" placeholder="输入名字" />
            <input ref={ageNode} type="text" placeholder="输入年龄" />
            <button onClick={addPerson}>添加</button>
            <ul>
                {props.persons.map(p => (
                    <li key={p.id}>
                        姓名：{p.name} -- 年龄：{p.age}
                    </li>
                ))}
            </ul>
            <h2>上方组件求和为：{props.count}</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        persons: state.persons,
        count: state.count
    }
}

const mapDispatchToProps = {
    addPerson
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,

)(Person)