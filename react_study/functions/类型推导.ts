
// 自动推导返回类型 (string|number)[]
function first(input:string){
    return [input[0],input.length]
}


function firstSize(input:string):[string,number]{
    return [input[0],input.length]
}

const [s,n]=firstSize("abc")
console.log(s,n)