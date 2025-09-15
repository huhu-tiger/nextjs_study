

// 密码
const createCipher=(key:string)=>{
    return (text:string)=>{
        let result = ""
        for(let i=0;i<text.length;i++){
            result += String.fromCharCode(text.charCodeAt(i)^key.charCodeAt(i%key.length))
        }
        return result
    }
}

//密码03
interface CodeCracker {
    attempts:number
    makeGuess(text:string,attempt:number):string
    validateGuess(text:string):boolean
}
const createCodeCracker: (c:CodeCracker)=>boolean|undefined=(c:CodeCracker):boolean|undefined=>{
    for (let i = 0; i < c.attempts; i++) {
        const guess =c.makeGuess("1234", i)
        if (c.validateGuess( guess)) {
            return true;
        }
    }
    return undefined
}

const makeGuess = (text:string,attempt:number):string=>{
    return text
}
const validateGuess = (text:string):boolean=>{
    return text==="1234"
}

console.log(createCodeCracker({attempts:5,makeGuess,validateGuess}))


// 函数重载
function fn1():number
function fn1(a:number):number
function fn1(a:number,b:number):number


function fn1(a?:number,b?:number):number{
    if (!!a && !!b){
        return a+b
    }
    if (!!a){
        return a
    }
    return 0
}

console.log(fn1(1))
console.log(fn1(1,2))
console.log(fn1())