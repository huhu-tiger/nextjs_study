(function () {
    'use strict';

    const getLength = (arg) => {
        return arg.length;
    };
    getLength("123");
    getLength({ length: 123 });
    // 2. 泛型约束 
    const fnn1 = (arg, key1) => {
        return arg[key1];
    };
    let obj111 = {
        name: "123",
        age: 123
    };
    console.log(fnn1(obj111, "name"));
    console.log(fnn1("dddd", "length")); // 4, 字符串 有 length 属性
    console.log(fnn1(["abc", "bn"], 1)); //  bn, 1 代表索引位置
    // type IRecord = {
    //     name:string
    //     age:string
    // }

})();
//# sourceMappingURL=bundle.js.map
