"use strict" 
// 是一个严格模式声明
// 它使JavaScript代码在更严格的条件下运行:
// 1. 消除JavaScript语法的一些不合理、不严谨之处
// 2. 保证代码运行的安全性
// 3. 提高编译器效率，增加运行速度
// 4. 为未来新版本的JavaScript做好铺垫
"use strict";
/*
类写法：
this绑定的区别
普通类方法：this是动态绑定的，取决于调用时的上下文
箭头函数：this是词法绑定的，继承自定义时的上下文
主要区别总结：
this绑定
普通方法可以通过bind、call、apply改变this指向
箭头函数的this永远指向定义时的上下文，无法被改变
构造函数
普通方法可以用new关键字调用
箭头函数不能用作构造函数，不能使用new
arguments对象
普通方法可以访问arguments对象
箭头函数没有自己的arguments对象
原型方法
普通方法可以作为原型方法
箭头函数不适合作为原型方法，因为所有实例会共享同一个this
代码简洁性
箭头函数在简单功能时写法更简洁
普通方法适合复杂的类方法实现
使用建议：
在类中定义方法时，优先使用普通方法
当需要确保this不被改变时，使用箭头函数
在回调函数中，使用箭头函数更方便，因为不用担心this指向问题
*/
class A{
    constructor(){
        this.a = 1;
        // 箭头函数方式
        this.printArrow = (x, y) => {
            console.log(this.a)
            console.log(this);
            console.log(x,y)
        }
    }
    // 普通方法
    print(x,y){
        console.log(this.a)
        console.log(this);
        console.log(x,y)
    }
}

let a = new A();
a.print();

let obj = {b:"123"}

// 使用普通方法 - this会改变
let p = a.print
let wrap_p = p.bind(obj,3,3)
wrap_p()  // this 指向 obj

// 使用箭头函数 - this不会改变
let p2 = a.printArrow
let wrap_p2 = p2.bind(obj,3,3)
wrap_p2()  // this 仍然指向 a 实例

var me={
	name:'我'
}
var friendA={
	name:'朋友A',
	sendMsg:function(target,content){
		console.log("【"+this.name+"】给【"+target+"】发送了短信："+content);
	}
}
 
var sendMsg = friendA.sendMsg.bind(me);
sendMsg('朋友C','改天请你吃饭啊！');
// ... existing code ...

// 方法1：使用 bind
var sendMsg2 = friendA.sendMsg.bind(friendA);
sendMsg2('朋友C','改天请你吃饭啊！');

// 或者方法2：使用 call/apply
var sendMsg2 = friendA.sendMsg;
sendMsg2.call(friendA, '朋友C','改天请你吃饭啊！');
// 或者用 apply
// sendMsg2.apply(friendA, ['朋友C','改天请你吃饭啊！']);

let ss = function(...values){   
	return values.join(",")
}

let arrs = [1,2,3,4,5]
let [aa,bb,cc,dd,ee] = arrs
console.log(aa,bb,cc,dd,ee)
let str = `aa:${ss(1,2)} bb:${bb} cc:${cc} dd:${dd} ee:${ee}`
console.log(str)