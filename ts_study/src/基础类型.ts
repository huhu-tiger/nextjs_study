// 1. string number boolean
let a: string = 'hello';
let b: number = 123;
let c: boolean = true;

console.log(a, b, c);

// 基础类型，包装类型,小写是基础类型，大写是包装类型
let s1: string = 'hello';
// let s2:string = new String('hello');
let s3: String = '1' // 赋值的时候，子集可以赋值给父集
console.log(s3);

let s4: String = new String('1') //类的类型，类类型，用来描述实例
console.log(s4);


// 数组概念，用于存储多个值的集合
// 数组要求每个元素的类型相同，不要求元素个数
let arr = [];
let arr2: string[] = ['1', '2', '3'];
let arr3: Array<string> = ['1', '2', '3'];
let arr4: Array<string | number> = ['1', '2', '3', 1];
let arr5: (string | number)[] = ['1', '2', '3', 1];

// 元组概念，用于存储多个值的集合，但是每个值的类型不同
// 元组要求每个元素的类型相同，不要求元素个数
let tuple: [string, number] = ['1', 1];
tuple.push('2');
console.log(tuple); // 元组可以添加元素，但是不能添加不同类型的元素


// 枚举概念，用于存储多个值的集合，但是每个值的类型不同
// 枚举就是对象，对象的属性名就是枚举的值
// 状态码，权限，标志位
let enum1: { name: string, age: number } = { name: '张三', age: 20 };
enum Status {
    Success = 200,
    Error = 400,
    NotFound //这里是401，前一个值加1
}
console.log(Status); // {200: "Success", 400: "Error", 401: "NotFound"}
let s: Status = Status.Success;
console.log(s); // 200
//反举
console.log(Status[200]); // Success
// 常量枚举，节约性能，不会生成对象
const enum E1 {
    A = 1,
    B = 2
}
console.log(E1.A); // 1

// null undefined 基本数据类型，正常情况下，null和undefined是所有类型的子集
let n: null = null;
let u: undefined = undefined;
console.log(n, u);
// 如果tsconfig.json中配置了strictNullChecks为true，则null和undefined是所有类型的子集


// void 表示没有返回值，一般用于函数(undefined是void的子集)
function fn(): void {
    console.log('fn');
    return undefined;
}
fn();


// never 表示永远不会返回结果
function whileTrue(): never {
    while (true) { }
}
// whileTrue();

function throwError(): never {
    throw new Error('throwError error');
}
try {
    throwError();
} catch (error) {
    console.log(error);
}
// 如果if else 中，一个分支返回了结果，另一个分支没有返回结果，则返回结果的类型是never

function toArrary(arg: string | number | boolean) {

    if (typeof arg === 'string') {
        return arg.split('');
    }
    if (typeof arg === 'number') {
        return arg.toString().split('');
    }
    if (typeof arg === 'boolean') {
        return arg.toString().split('');
    }
    const n: never = arg; // 这里会报错，因为never只能赋值给never，上面条件没判断完整，会报错
}
console.log(toArrary(1111));
console.log(toArrary(true));
console.log(toArrary('hello'));


// any 表示任意类型，一般用于函数(any是所有类型的子集),尽量不要写，会破坏类型系统
let a1: any = 1;
let a2: any = 'hello';
let a3: any = true;
let a4: any = { name: '张三', age: 20 };
let a5: any = [1, 2, 3];

// object 引用类型，表示非原始类型
function fn1(obj: object) {
    console.log(obj);
}
fn1({ name: '张三', age: 20 });
fn1([1, 2, 3]);
// fn1(1); // 会报错，因为1是原始类型


// symbol 表示唯一标识符，一般用于对象的属性名
let ss1 = Symbol('ss1');
let ss2 = Symbol('ss2');    
console.log(ss1, ss2);
console.log(ss1 === ss2); // false

// bigint 表示大整数，一般用于表示非常大的数
let b1 = 123;
let b2 = BigInt(123);
console.log(b1, b2);


