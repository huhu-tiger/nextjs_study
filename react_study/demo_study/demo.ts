
type T1 ={
    name: string
}

type fn1 =(input:T1)=> string

let var1: T1 = {name: "tao"}
let fn2 :fn1 = (input   :T1) =>{
    console.log(input)
    return `${var1.name}`
}

console.log(fn2(var1))

let a = {
    name: "Tao",
    age: 18
}
// typeof 将对象 转换为 类型
type Ta = typeof a

// 类型可以 冗余，至少包含类型中定义的属性
console.log(fn2(a))


interface Person {
    name: string
    age: number
}

type PersonKeys = keyof Person 