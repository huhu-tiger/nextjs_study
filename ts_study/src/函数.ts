// 函数的类型 ，声明方式，参数，返回值
// function 关键字来声明的函数可以 提升到当前作用域的顶部
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(1, 2));

// 函数类型的 约束
// 类型为 (a: number, b: number) => number，代表传入参数和返回值的类型
const add2: (a: number, b: number) => number = (a, b) => {
    return a + b;
}

// 类型别名,与上面方式 效果一样
type Iadd2 = (a: number, b: number) => number;

const add3: Iadd2 = (a, b) => {
    return a + b;
}

console.log(add3(1, 2));

// 参数，可选参数 ?，默认参数 ，剩余参数
const sum = function (a: number, b: number = 1, c?: number): number {
    return a + b + (c || 0);
}

console.log(sum(1, 2));
console.log(sum(1, 2, 3));

// 剩余参数
const sum2 = function (a: number, b: number = 1, ...c: number[]): number {
    return a + b + c.reduce((pre, cur) => pre + cur, 0);
}
// 注意,Isum2 与 赋值的函数 参数类型 不一致时，会报错
type Isum2 = (a: number, b?: number) => number;
const sum3: Isum2 = function (a, b = 1) {
    return a + b;
}

console.log(sum2(1, 2, 3, 4, 5));
console.log(sum3(1, 2));


// 参数this问题
//尽量不采用this来作为函数的上下文，this不能类型推导
// keyof 获取对象的属性名
// this是上下文，this的类型需要显示声明
function say(this: IPerson, key: IKey) { // this 不是形参，是上下文
    return this[key];
}
const person = {
    name: '张三',
    age: 18,
}
// 根据值推断类型 typeof,配合type 声明新的类型
type IPerson = typeof person; // 推断为 { name: string; age: number; }
type IKey = keyof IPerson; // 推断为 "name" | "age"
say.call(person, 'name');
// say.call(person, 'age1'); // 报错

function fn4(p: IPerson, key: IKey) {
    return p[key];
}

console.log(fn4(person, 'name'));
console.log(fn4(person, 'age'));


// 函数中有argsuments 参数,不建议用
function fn5(...args: number[]) {
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(fn5(1, 2, 3, 4, 5));

type IArgs = {
    name: string,
    age: number,
    gender: string,
    resource?: { [key: string]: string | number }

}

let ab1: IArgs = {
    name: '张三',
    age: 18,
    gender: '男',

}

console.log(ab1.resource?.name);

// (a:number,b:number)=>string 表示函数类型，a:number,b:number 表示参数类型，string 表示返回值类型
// 箭头函数  (a:number,b:number)表示参数类型，string 表示返回值类型
const ff1:(a:number,b:number)=>string = (a:number,b:number):string=>{
    return (a + b).toString();
}

console.log(ff1(1,2));



// 函数重载
function fn6(a:number,b:number):number;
function fn6(a:string,b:string):string;
function fn6(a:any,b:any):any{
    return a+b;
}

function fn7<T>(a:T,b:T):string{
    if (typeof a === 'number' && typeof b === 'number') {
        return (a + b).toString();
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    } else {
        return "参数类型不一致";
    }
}

fn7<number>(1,2);
fn7<string>('hello','world');
