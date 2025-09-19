interface IObj11{
    name:string,
    [key:string]:string
}


type TObj = {
    name: string,
    [key: string]: string | { [key: string]: string } //name 属性是 string 类型，已经符合索引签名[key: string]: string，所有要加联合类型
    resource: {
        [key: string]: string,
    }
}

type TObj1 = keyof TObj

let obj12:TObj = {
    name:"123",
    age:"123",
    resource:{
        name:"123"
    }
}



interface Myarr<T>{
    [n:number]:T
}
const arr123:Myarr<string> = ["a","2","3"]