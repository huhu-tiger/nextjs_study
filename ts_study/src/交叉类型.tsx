// 交叉类型，类似于接口的extends 
interface Iperson {
    name: string;

}

interface Iperson2 {
    age: number;
    say?: () => void;
}

type Iperson3 = Iperson & Iperson2;

let p1: Iperson3 = {
    name: '张三',
    age: 18
}


// 交叉类型 和 接口的extends 的区别

interface A {
    fn: (name :string) => void;
}

// interface B extends A { //报错，因为B的fn与A的fn不兼容
//     fn: (name :string, age: number) => void;
// }
interface B {
    fn: (name :number,age: number) => void;
}

type C = A & B;

let ccc: C = {
    fn: (name: string|number) => { // 交叉类型 ，两个的联合类型
        console.log(name);
    }
}
