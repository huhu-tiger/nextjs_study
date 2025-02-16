// 接口： 抽象类（类中可以有实现的方法）,接口必须都是抽象的 （没有具体实现）
// 接口的概念，就是描述数据的结构 针对结构来进行约束


// type 和 interface 的区别
// type 和 interface 都可以描述数据结构，但是 type 可以描述联合类型，接口不能描述联合类型
// type 和 interface 都可以继承，但是 type 可以继承多个类型，接口只能继承一个类型
// type 和 interface 都可以描述函数，但是 type 可以描述重载，接口不能描述重载
// type 和 interface 都可以描述类，但是 type 不能描述类，接口可以描述类


interface IUser{
    name:string; // 
    age:number;
    // abc:"abc"; // 字面量类型, 类型只能是abc,不能是其他值
}

let user= {
    name:"张三",
    age:18,
    gender:"男"
}
let user2:IUser = user;
console.log(user2); // 取不出gender

// 2.  接口描述函数
interface ICounter{ //
    ():number;
    count:number;
}

const counter:ICounter = () => { // 只能是const 不能是let, 因为let 是变量，不能被重写

    return counter.count++;
}

counter.count = 0;
console.log(counter()); // 1


// 不完全满足,
interface IAnimal{
    name:string;
    taste:string;
    size:number;
    color:string;  // 方法一可选属性 color?
}
// 方法二 断言
let animal:IAnimal = {
    name:"狗",
    taste:"甜",
    size:10,
} as IAnimal;

// 方法三 接口合并
interface IVeg{
    readonly color?:string;
}
interface IVegtable extends IVeg{
    taste:string;
}

let veg:IVegtable = {
    color:"red", // 可选属性
    taste:"甜",
}
// 方法四 任意类型
interface IAny{ //索引接口
    color:string;
    [key:string]:   any; // key 随意，值随意
}

let any:IAny = {
    color:"red",
    name:"狗",
}


// 接口嵌套
interface ResponseData{
    name:string;
    age:number;
}

interface ReturnData    {
    data:ResponseData;
    code:number;
}

let returnData:ReturnData = {
    data:{
        name:"张三",
        age:18,
    },
    code:200,
}
/*
TCode：类型为 number，它是 ReturnData 中 code 属性的类型。
TUser：类型为 string，它是 ReturnData 中 data 对象里的 name 字段的类型。
Ikeys：类型为 ResponseData | number，它是 ReturnData 中 data 和 code 两个属性的联合类型。
IData：类型为 ResponseData，它是 ReturnData 中 data 属性的类型。
*/
type TCode = ReturnData["code"];
type TUser = ReturnData["data"]["name"];

type Ikeys = ReturnData[keyof ReturnData]; 

type IData = ReturnData["data"];


function getUser(user:Ikeys):void{
    console.log(user);
}

getUser(returnData.data);
getUser(returnData.code);

// 接口可以 实现
interface IUser1{
    // speak:()=>void; //实现实例方法
    speak():void; //实现原型
}

interface IUser2{
    speakChinese():string;
}
class User implements IUser1,IUser2{
    // speak(): void { // 实现实例方法
    //     throw new Error("Method not implemented.");
    // }
    speak(): void { // 实现原型
        throw new Error("Method not implemented.");
    }
    speakChinese(): string {
        throw new Error("Method not implemented.");
    }
    
}
// 泛型
// 泛型坑位 函数形参 刚开始类型不确定，通过使用的时候 来确定泛型
class Dog {

}
class Cat1 {

}


// 描述
function createInstance<T>(c:new ()=>T){
    return new c();
}

// interface IClass<T>{
//     new ():any;
// }
type IClass1<T> = new ()=>T;
function createInstance1<T>(c:IClass1<T>){
    return new c();
}

let dog = createInstance<Dog>(Dog);
let cat1 = createInstance1<Cat1>(Cat1);
