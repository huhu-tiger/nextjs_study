type T1 = {
    name:string,
    age:number
}

type T11 = T1["name"]

type T12 = T1["name"|"age"]

type T13 = T1["name"] extends string ? true : false // 类型推断,name 是 string 类型,所以返回 true

type T14 = T1["name"] extends number ? true : false // 类型推断,name 是 string 类型,所以返回 false

type T15 = T1[keyof T1] // 类型推断,keyof T1 是 "name" | "age",所以 T15 是 string | number