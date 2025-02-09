"use strict";
// 1. let 和 const
let name = 'ES6';
const VERSION = '6.0';

// 2. 箭头函数
const add = (a, b) => a + b;
const square = x => x * x;

// 3. 模板字符串
const user = 'John';
const greeting = `Hello ${user}!
This is a multiline
string.`;

// 4. 解构赋值
// 数组解构
const numbers = [1, 2, 3];
const [first, second, third] = numbers;

// 对象解构
const person = { name: 'Alice', age: 25 };
const { name: userName, age } = person;

// 5. 展开运算符
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// 对象展开
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { ...obj1, y: 13 };

// 6. 类
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound.`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} barks.`;
    }
}

// 7. 模块化
// export const helper = {
//     sum: (a, b) => a + b
// };

// 8. Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched');
        }, 1000);
    });
};

// async/await
async function getData() {
    const result = await fetchData();
    console.log(result);
}

// 9. Map 和 Set
const map = new Map();
map.set('key', 'value');

const set = new Set([1, 2, 2, 3]); // 结果为 [1, 2, 3]

// 10. 默认参数
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

// 使用示例
console.log(add(2, 3)); // 5
console.log(greeting); // Hello John! ...
console.log(arr2); // [1, 2, 3, 4, 5]
console.log(obj2); // { foo: 'bar', x: 42, y: 13 }

const dog = new Dog('Rex');
console.log(dog.speak()); // Rex barks.

getData(); // Data fetched
console.log(greet()); // Hello, Guest!
console.log(greet('Alice')); // Hello, Alice!

// 类中箭头函数vs普通函数示例
class Example {
    constructor() {
        this.value = 42;
        // 箭头函数方式
        this.arrowMethod = () => {
            console.log('Arrow Function this:', this.value);
        }
    }

    // 普通函数方式
    regularMethod() {
        console.log('Regular Function this:', this.value);
    }
}

const example = new Example();

// 直接调用
example.arrowMethod();    // Arrow Function this: 42
example.regularMethod();  // Regular Function this: 42

// 作为回调函数使用
const arrowCallback = example.arrowMethod; // 箭头函数
const regularCallback = example.regularMethod; // 普通函数
console.log("箭头函数保持this指向");
// 箭头函数保持this指向
arrowCallback();         // Arrow Function this: 42

// 普通函数丢失this指向 
console.log("普通函数丢失this指向");
console.log("使用bind修复普通函数的this指向")
//regularCallback()
// 使用bind修复普通函数的this指向
const boundRegularCallback = example.regularMethod.bind(example);
boundRegularCallback();  // Regular Function this: 42

// 测试结果演示
console.log('\n=== ES6特性测试结果 ===');

// 1. let和const测试
console.log('\n1. let和const:');
console.log('name:', name);
console.log('VERSION:', VERSION);

// 2. 箭头函数测试
console.log('\n2. 箭头函数:');
console.log('add(2, 3):', add(2, 3));
console.log('square(4):', square(4));

// 3. 模板字符串测试
console.log('\n3. 模板字符串:');
console.log(greeting);

// 4. 解构赋值测试
console.log('\n4. 解构赋值:');
console.log('数组解构 [first, second, third]:', first, second, third);
console.log('对象解构 {userName, age}:', userName, age);

// 5. 展开运算符测试
console.log('\n5. 展开运算符:');
console.log('数组展开:', arr2);
console.log('对象展开:', obj2);

// 6. 类测试
console.log('\n6. 类:');
const animal = new Animal('Cat');
console.log('Animal:', animal.speak());
console.log('Dog:', dog.speak());

// 7. Promise和async/await测试
console.log('\n7. Promise和async/await:');
fetchData().then(data => console.log('Promise结果:', data));

// 8. Map和Set测试
console.log('\n8. Map和Set:');
console.log('Map值:', map.get('key'));
console.log('Set值:', [...set]);

// 9. 默认参数测试
console.log('\n9. 默认参数:');
console.log('无参数调用:', greet());
console.log('带参数调用:', greet('Bob'));

// 10. 箭头函数vs普通函数测试
console.log('\n10. 箭头函数vs普通函数在类中的区别:');
console.log('=== 直接调用 ===');
example.arrowMethod();
example.regularMethod();


console.log('\n=== 作为回调函数 ===');
arrowCallback();
// regularCallback();

console.log('\n=== 使用bind后 ===');
boundRegularCallback();

// 11. 定义对象
console.log("定义对象");
let x=1,y=2;
let obj3={
    x,
    y,
    add(){
        return x+y;
    }
};
console.log(obj3);
console.log(obj3.add());

// 12. 对象的复制
console.log("对象的复制");
let obj4={
    a:1,
    b:2
};
let obj5=Object.assign({},obj4);
console.log(obj5);
console.log(obj4.a == obj5.a);

// 13. Object.setPrototypeOf() 设置原型
console.log("设置原型");
let obj6={
    getAge(){
        return 10;
    }
};
let obj7={
    getAge(){
        return 20;
    }
};

// 使用Object.create()创建一个新对象obj8,而不是直接赋值
// 1. 直接赋值只是引用,两个对象会相互影响
// 2. Object.create()创建一个全新对象,并将参数作为新对象的原型
// 3. 这样可以实现继承关系,又不会相互污染
let obj8=Object.create(obj7);
console.log("obj8",obj8.getAge());
Object.setPrototypeOf(obj8,obj6);

console.log("设置obj8的原型为obj6后:",obj8.getAge());

// 14. Object.getPrototypeOf() 获取原型
console.log("获取原型");
console.log(Object.getPrototypeOf(obj8));

// 15. Object.keys() 获取对象的键
console.log("获取对象的键");
console.log(Object.keys(obj7));

// 16. __proto__ 获取对象的原型
console.log("获取对象的原型__proto__ ");
console.log(obj8.getAge());
obj8.__proto__=obj7; // 设置obj8的原型为obj7
console.log(obj8.__proto__);
console.log(obj8.getAge());

// 17. class get set
console.log("class get set");
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    get name(){
        return this._name;
    }
    set name(value){
        this._name=value;
    }
    static getInfo(...value){
        return value;
    }
    getInfo(){
        return this.name;
    }
}
let p1 = new Person("张三",20);
console.log(p1.name);
p1.name="李四";
console.log(p1.name);
console.log(Person.getInfo());
console.log(Person.getInfo("张三",20));

// 18. 继承
console.log("继承");
class Student extends Person{
    constructor(name,age,score){
        super(name,age);
        this.score=score;
    }
    getScore(){
        return this.score;
    }
}
let s1 = new Student("张三",20,90);
console.log(s1.getScore());
console.log(s1.getInfo());

// 19. 多态
console.log("多态");
class Animal1{
    speak(){
        return "Animal";
    }
}
class Dog1 extends Animal1 {
    speak(){
        return "Dog";
    }
}
class Cat1 extends Animal1 {
    speak(){
        return "Cat";
    }
}

let animal1 = new Animal1();
let dog1 = new Dog1();
let cat1 = new Cat1();
console.log(animal1.speak());
console.log(dog1.speak());
console.log(cat1.speak());

// 20. map
console.log("map");
let map1 = new Map();
map1.set("name","张三");
map1.set("age",20);
console.log(map1);
console.log(map1.get("name"));
console.log(map1.has("name"));
map1.delete("name");
console.log(map1.has("name"));
map1.clear();
console.log(map1);
map1.forEach((value,key)=>{
    console.log(`${key}:${value}`);
});

// 21. set
console.log("set");
let set1 = new Set();
set1.add("张三");
set1.add("李四");
console.log(set1);
set1.forEach((value)=>{
    console.log(value);
});

/* 输出结果大致如下：
=== ES6特性测试结果 ===

1. let和const:
name: ES6
VERSION: 6.0

2. 箭头函数:
add(2, 3): 5
square(4): 16

3. 模板字符串:
Hello John!
This is a multiline
string.

4. 解构赋值:
数组解构 [first, second, third]: 1 2 3
对象解构 {userName, age}: Alice 25

5. 展开运算符:
数组展开: [1, 2, 3, 4, 5]
对象展开: { foo: 'bar', x: 42, y: 13 }

6. 类:
Animal: Cat makes a sound.
Dog: Rex barks.

7. Promise和async/await:
Promise结果: Data fetched

8. Map和Set:
Map值: value
Set值: [1, 2, 3]

9. 默认参数:
无参数调用: Hello, Guest!
带参数调用: Hello, Bob!

10. 箭头函数vs普通函数在类中的区别:
=== 直接调用 ===
Arrow Function this: 42
Regular Function this: 42

=== 作为回调函数 ===
Arrow Function this: 42
Regular Function this: undefined

=== 使用bind后 ===
Regular Function this: 42
*/
