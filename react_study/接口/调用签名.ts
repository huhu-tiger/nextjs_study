interface IPage {
    readonly text:string
}

function read(page:IPage){
    return page.text
}

const pageIsh={
    text: "hello"
}
pageIsh.text+="word"

//可以传入形参，函数读写 包含了只读
console.log(read(pageIsh))


// xxx  调用签名
type FunctionAlias = (input:string)=>number
interface CallSignature {
    (input:string):number
}
const fn1:FunctionAlias = (input:string):number=>{
    return input.length
}
const fn2:CallSignature = (input:string):number=>{
    return input.length
}

// xxx
// 定义一个带有调用签名和属性的接口
interface FunctionWithCount {
    // 属性：用于记录调用次数
    count: number
    // 调用签名：表示这个接口也可以像函数一样被调用
    (): void
}

// 声明一个符合 FunctionWithCount 接口的变量
let hasCallCount: FunctionWithCount

// 定义一个函数，该函数也具有 count 属性
function keepTrackOfCalls() {
    // 每次调用时，增加计数器
    keepTrackOfCalls.count += 1
    console.log(`called ${keepTrackOfCalls.count}`)
}

// 初始化函数的计数器
keepTrackOfCalls.count = 0

// 将函数赋值给 hasCallCount 变量
// todo 这里利用了 JavaScript 中函数也是对象的特性
// 函数本身可以有属性，同时也可以被调用
hasCallCount = keepTrackOfCalls