// 类： 类的组成： 构造函数，属性（静态属性，实例属性），方法（静态方法，实例方法）

class circle {
    //声明属性
    public x: number;
    public y: number;
    public fn: () => void
    constructor(x: number, y: number = 200) {
        this.x = x;
        this.y = y;
        this.fn = () => { }

    }

}

// 1.类的修改符
// public 公有属性，在类内部和外部都可以访问
// private 私有属性，在类内部可以访问，外部不能访问
// protected 受保护属性，在类内部和子类可以访问，外部不能访问，实例不能访问
// static 静态属性，属于类，不属于实例
// readonly 只读属性，只能在构造函数中初始化,不能在类内部修改

class Animal {

    //定义原型属性
    readonly aliasName1: string = '111'; //所有实例共享属性

    constructor(protected name: string) { //等价于 public name:string = '';
        this.name = name;


    }
    //原型函数的void类型，表示不关心子类返回值,不是空的意思
    changeName(name: string, age: number): void {
        this.name = name;

    }

    //原型方法,所有实例共享方法
    //getter 不能有参数，setter 必须有且只能有一个参数
    get aliasName(): string {
        return this.name;
    }
    set aliasName(name: string) {
        this.name = name;
    }
    static aliasName2: string = '222'; //静态属性，属于类，不属于实例
}

// 2. 类的继承
// super在构造函数中，表示父类的构造函数，在实例的方法中，表示父类的实例
class Cat extends Animal {

    constructor(name: string, public readonly age: number) {
        super(name);
        this.age = age;
    }
    //子类在重写父类的方法时，子类调用父类的时候，赋值的参数要与父类兼容
    changeName(name: string) { //
        super.changeName(name, this.age);
    }
}


const cat = new Cat('cat', 1);
console.log(cat.aliasName1);

const obj = { name: '张三', age: 18 }

cat.changeName.bind(obj)('李四')



// 3. 类的实现
interface IAnimalSub {
    sayName: () => string;

}
interface IAnimal1 extends IAnimalSub {
    eat(): void;
    readonly name: string;
}

class Animal33 implements IAnimal1 {
    name: string = '动物';
    sayName(): string {
        return '动物';
    }
    eat(): void {
        console.log('吃东西');
    }
}

const animal33: IAnimal1 = new Animal33();
animal33.sayName();
animal33.eat();
// animal33.name = '猫'; // 报错，name是只读属性



// 4. 类中原型方法
class Animal11 {
    // 原型属性 - 所有实例共享
    public name: string = '动物';

    // 实例属性 - 每个实例独有
    constructor(public age: number) {
        this.age = 1; // 实例属性,每个实例都有自己的副本
    }

    // 原型方法 - 所有实例共享
    eat() {
        console.log('吃东西');
    }

    // 实例方法 - 在构造函数中定义,每个实例独有
    sayAge = () => {
        console.log(this.age);
    }
}

// 测试
const animal1 = new Animal11(1);
const animal2 = new Animal11(2);

// 原型方法共享
console.log(animal1.eat === animal2.eat); // true

// 实例方法独立
console.log(animal1.sayAge === animal2.sayAge); // false



// 原型属性共享
animal1.name = '猫';
console.log(animal2.name); // 猫

// 实例属性独立
animal1.age = 2;
console.log(animal2.age); // 1
// 类中实例属性，必须通过实例化对象来访问
const a111 = new Animal11(1)
a111.eat() //原型方法




// 3.单例模式
class Single {
    private static instance: Single; //自己本身创建实例
    private constructor() { //私有构造函数，不能被外部实例化

    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Single();
        }
        return this.instance;
    }
}
let single1 = Single.getInstance();
let single2 = Single.getInstance();
console.log(single1 === single2);

// 4. ts中有抽象类，抽象类不能被实例化
// 抽象类中可以有抽象方法，抽象方法不能有实现，抽象方法必须在子类中实现
// 有点像接口，子类实现抽象类，必须实现抽象方法
{ // 作用域，防止全局污染，同名变量与类名冲突

    abstract class Animal {
        abstract eat(): void;
        drink(): void { // 抽象类中可以有实现的方法
            console.log('喝水');
        }
    }

    class Dog extends Animal {
        eat(): void {
            console.log('狗吃骨头');
        }
    }
    const dog = new Dog();
    dog.eat();
    dog.drink();


}


