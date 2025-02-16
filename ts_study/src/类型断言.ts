//声明类型的时候，如果没有标识类型，会根据赋值的类型推断出类型
let ia = 1;
let ib = 'hello';
let ic = true;
let id = { name: '张三', age: 20 };
let ie = [1, 2, 3];

console.log(typeof ia);
console.log(typeof ib);
console.log(typeof ic);
console.log(typeof id);
console.log(typeof ie);



// 断言的问题
let strOrNum: string | number // 如果是联合类型，不能直接访问联合类型的属性或方法，只能访问联合类型的公共属性或方法
 // 1、 指定类型在使用
//  strOrNum = 1;
// console.log(strOrNum.length); // 报错
// console.log(strOrNum.toFixed(2)); // 报错

// 2、断言后在使用
// 
// strOrNum! 表示非空断言，告诉编译器这个值一定不是null或undefined
// 不加!号时，如果strOrNum可能为null或undefined，编译器会报错
// xxxx 但是使用!号要谨慎，如果实际值为null会在运行时报错
strOrNum = "1";
(strOrNum! as string).length;
strOrNum = 1;
(<number>strOrNum!).toFixed(2);
let ele = document.getElementById('app')!; //！表示非空断言，告诉编译器这个值一定不是null或undefined
// as 将大类型转换为小类型
// (ele as HTMLElement).style.backgroundColor = 'red';

type Direction= 'up' | 'down' | 'left' | 'right' ; // 快速创建一个可复用的类型
let direction: Direction = 'down'
let up1: 'down' = direction! as 'down';
console.log(up1);

// ? 表示可选类型，可以有值，也可以没有值,只能取值
ele?.style.backgroundColor

// ?? 表示空值合并运算符，如果左边为null或undefined，则返回右边
let an =null
let str = an ?? 'hello';
console.log(str);

// 类型断言
let strOrNum2: string | number = '1';
