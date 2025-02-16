/*
typeof 在JS代码中，可以获取变量的类型
console.log(typeof "hello") // string

typeof 在TS代码中，可以获取变量的类型
let a = "hello"
let aType:typeof a = "hello" // 类型是string


*/
let obj11 = {
    name:"张三",
    age:123
}

let objType:typeof obj11 = { // 类型是{ name: string; age: number; }
    name:"张三",
    age:123
}
type objType2 ={
  name?:string,
  age:number
}
let objType2:objType2 = {
  name:"张三",
  age:123
}




// 1.keyof 作用 获取对象的键
interface Person {
    name: string;
    age: number;
  }
  
  type PersonKeys = keyof Person;  // 'name' | 'age'
  


// 2. keyof 获取对象的键
interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  type ProductKey = keyof Product;  // 'id' | 'name' | 'price'
  
  // 使用 ProductKey 获取值的类型
  function getProductProperty(product: Product, key: ProductKey): string | number {
    return product[key];  // 根据 key 返回不同类型的值
  }
  
  const product = { id: 1, name: "Laptop", price: 1000 };
  
  const productName = getProductProperty(product, "name");  // 'Laptop'
  const productPrice = getProductProperty(product, "price");  // 1000
  


// 3.动态推导类型
// 定义一个对象 person2，包含 name 和 age 两个属性
const person2 = { name: "Alice", age: 25 };

//!!! typeof person2 获取 person2 对象的类型，即 { name: string; age: number }
// keyof 获取这个类型的所有属性名的联合类型
// 所以 PersonKeys1 的类型就是 'name' | 'age'
type PersonKeys1 = keyof typeof person2;  // 'name' | 'age'

  
// typeof
let name11 = "Alice";
let nameTyp111: typeof name11; // "Alice" 的类型是 string
let nameType111 = "Bob"; // 有效，因为 name 是字符串类型

const person111 = { name: "Alice", age: 25 };
let personType: typeof person111;

// 这意味着 personType 的类型是 { name: string, age: number }
personType = { name: "Bob", age: 30 }; // 有效
// personType = { name: "Charlie", age: "twenty" }; // 错误：类型不匹配

// typeof 获取函数类型

function greet(name: string): string {
    return `Hello, ${name}!`;
  }
  
let greetType: typeof greet;
  
  // greetType 类型会是 (name: string) => string
greetType = greet; // 有效
greetType = function(name:string){
    return "hello"
}
greetType = (name:string)=>{
    return "hello"
}
//   greetType = (name) => 42; // 错误：返回类型不匹配

// interface 与 type 的区别: 
// 1. interface 可以继承多个接口，而 type 只能继承一个类型
interface IObj{
    name?:string,
    age:number
    say:()=>void
}

type Tobj={
    name:string,
    age?:number,
    say:()=>void
}

let obj1:IObj = {age:123,say:()=>{}}
let obj2:Tobj = {name:"123",say:()=>{}}



