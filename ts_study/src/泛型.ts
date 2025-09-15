// 泛型可以 用于 函数 类 接口 类型别名
// 无法确定泛型类型 可以 使用 泛型约束


// 泛型函数

function createArr<T>(times: T, val: T[]): T[] {
     val.push(times)
     return val
}

console.log(createArr<string>("1", ["1","2"])) // [ '1', '2', '1' ]

// // keyof 约束
function showobj<T,K extends keyof T>(obj:T,val:K):T[K]{
    return obj[val]
}
const objex11= {
    "a":"b"
}
console.log(`showobj: ${showobj(objex11,"a")}`) // "b"


const showObj11=<T,K extends keyof T>(obj :T,key :K):T[K] =>{
    return obj[key]
}

console.log(`showObj11: ${showObj11(objex11,"a")}`) // "b"

// 泛型约束
// 1. 泛型约束 可以 约束 泛型 的类型
interface ILength{
    length:number
}
// // 扩展约束， T 必须要有length 属性
const getLength = <T extends ILength>(arg:T):number=>{
    return arg.length
}

console.log(getLength("123")) // 3
console.log(getLength({length:123})) // 123


// 写辅助函数
// 值的交换,T,U 名字自定义
const swap =<T,U>(arr1:[T,U]):[U,T]=>{
    return [arr1[1],arr1[0]]
}

console.log(swap(["1",2])) // [2,"1"]

// 函数形参为函数


const fanxing1=<T,U>(arr:T[],mapper:(item:T)=>T):T[]=>{
    return arr.map(mapper)
}

console.log(fanxing1(["1","2"],(item)=>{return `cook ${item}`})) // ["cook 1","cook 2"]

// 接口泛型

interface I2<T> {
    age:T
}

interface I1<S,T> extends I2<T> {
    name:S
}


const faxing2=(data:I1<string,number>):I1<string,number>=>{
    return {name:data.name,age:data.age+1}
}

console.log(faxing2({name:"aaa",age:18})) // {name:"aaa",age:19}

// 泛型类

class MyArray<T>{
    private arr:T[] = []

    set(item:T){
        this.arr.push(item)
    }
    get(): T[]{
        return this.arr
    }
    
    
}
const m = new MyArray<number>()
m.set(1)
console.log(m.get()) // [1]

// 泛型工具类型
/*
Partial<T> 将 T 的属性变为可选
Required<T> 将 T 的属性变为必选
Readonly<T> 将 T 的属性变为只读
Pick<T,K extends keyof T> 从 T 中选择一组属性
Omit<T,K extends keyof T> 从 T 中移除一组属性
Extract<T,U> 提取 T 中可以赋值给 U 的类型
*/

// 1. Partial<T> 将 T 的属性变为可选
interface IPartial{
    name:string
    age:number
}

type IPartial1 = Partial<IPartial> //变成可选
// type IPartial1 = {
//     name?:string
//     age?:number
// }
// 2. readonly 将 T 的属性变为只读
type IReadonly = Readonly<IPartial>
// type IReadonly = {
//     readonly name:string
//     readonly age:number
// }

// 3. Pick<T,K extends keyof T> 从 T 中选择一组属性
type IPick = Pick<IPartial, "name"|"age">
// type IPick = {
//     name:string
//     age:number
// }

// 4. Omit<T,K extends keyof T> 从 T 中移除一组属性
type IOmit = Required<Omit<IPartial, "name">>
// type IOmit = {
//     age:number
// }

// 5. Required<T> 将 T 的属性变为必选
type IRequired = Required<Omit<IPartial, "name">> // 移动了 name 属性，剩下age 必选
// type IRequired = {
//     age:number
// }

// 6. Record<K extends keyof any,T> 将 K 的属性变为 T 类型
type IRecord = Record<"name"|"age",string> // 将 name 和 age 的属性变为 string 类型
// type IRecord = {
//     name:string
//     age:string
// }


















