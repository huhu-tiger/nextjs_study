let aaa = "123"
const bbb = "123" // 字面量类型 ，类型是"123",某个字符串也能是类型


let aaaa:"111"="111" // 字面量类型 ，类型是"111",某个字符串也能是类型
const bbbb:"xxx"="xxx" // 字面量类型 ，类型是"xxx",某个字符串也能是类型

const up = "up"
const down = "down"
const left = "left"
const right = "right"

// 字面 量加联合类型 实现枚举
type MyType = (a:typeof up | typeof down | typeof left | typeof right) => void
type MyType2 = (a:"up" | "down" | "left" | "right") => void

let myType:MyType = function(a){
    console.log(a)
}
