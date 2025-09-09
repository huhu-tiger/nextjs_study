

console.log("====函数柯里化====")

interface Iadd {
    (a:number,b:number):number
}
// 常规写法
const add:Iadd = (a:number,b:number):number=>{
    return a+b
}
console.log(add(1,2))

// 柯里化写法
// const add1 = (a:number)=> 后面要 返回函数,必须是()包裹,如果是{}，则相当于直接返回了对象
const add1 = (a:number) => ((b:number)=>(a+b))
console.log(add1(2)(3)) 

// 返回对象
const add2 = (a:number) => ((b:number)=>({"aa":a,"bb":b}))
console.log(add2(2)(3)) 