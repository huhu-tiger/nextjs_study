// 泛型可以 用于 函数 类 接口 类型别名
// 无法确定泛型类型 可以 使用 泛型约束

const createArr = <T>(times: T, val: T[]): T[] => {
    let abc = val.map(item => {
        return item;
    });
    return abc
}

const arr1 = createArr("q", ['a'])



// 泛型约束
// 1. 泛型约束 可以 约束 泛型 的类型
interface ILength{
    length:number
}

const getLength = <T extends ILength>(arg:T):number=>{
    return arg.length
}

getLength("123")
getLength({length:123})


// 2. 泛型约束 
const fnn1 = <T ,key extends keyof T>(arg:T,key1:key):T[key]=>{
    return arg[key1]
}

let obj111  = {
    name:"123",
    age:123
}

console.log(fnn1(obj111,"name"))
console.log(fnn1("dddd","length")) // 4, 字符串 有 length 属性
console.log(fnn1(["abc","bn"],1))    //  bn, 1 代表索引位置

// 写辅助函数
// 值的交换,T,U 名字自定义
const swap = <T, U>(tuple: [T, U]): [U, T] => {
    return [tuple[1], tuple[0]]
}

const swapArr = swap(['a', 1])

// 接口泛型

interface IArr<T>{
    a:T
    arr:T[]
}

let arr111:IArr<number> = {
    a:1,
    arr:[1,2,3]
}

// 泛型类

class MyArray<T>{
    private arr:T[] = []
    add(item:T){
        this.arr.push(item)
    }
    
}
const m = new MyArray<number>()


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


















