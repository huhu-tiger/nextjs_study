// 1. 两个类，属性方法相同
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
// 类型兼容性
let point: Point = new Point3D(1, 2);


// 类型断言
let point3D: Point3D = point as Point3D;

// 2. 一个类比另一个类属性多
class Point2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Point3D1 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
// 成员多的 可以 赋值给 成员少的
let point2D: Point2D = new Point3D1(1, 2, 3);
// 只能访问类型少的属性
console.log(point2D.x, point2D.y);

// 3. 接口兼容
interface IAnimal31 {
    name: string;
}

interface IAnimal32 {
    name: string;
    taste: string;
}

let i11: IAnimal31
let i22: IAnimal32 = {
    name: 'cat',
    taste: 'sweet'
}

i11 = i22;

// 4. 函数兼容
type Fn1 = (a: number, b: number) => void;
type Fn2 = (a: number) => void;

let fn111: Fn1;
let fn222: Fn2 = (a: number) => {
    console.log(a);
}
// 参数少的 可以 赋值给 参数多的
fn111 = fn222;
const fn333: Fn1 = (a: number) => {
    console.log(a);
}

fn111 = fn333;





