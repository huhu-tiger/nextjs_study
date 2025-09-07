// 练习1：类型推断和注解

const products: Array<{id:number,name:string,price:number,inStock:boolean}> = [
  { id: 1, name: "Laptop", price: 999.99, inStock: true },
  { id: 2, name: "Mouse", price: 29.99, inStock: false }
];

type Tproducts = typeof products

function calculateTotal(products: Tproducts) {
  return products.reduce((total, product) => total + product.price, 0);
}


console.log(calculateTotal(products))

// 练习2：联合类型和类型守卫

// 任务：创建一个函数，处理不同类型的用户输入
type UserInput = string | number | boolean;

function processUserInput(input: UserInput): string {
      if (typeof input === 'string') {
          return `Processing string input: ${input}`
      }else if (typeof input === 'number') {
          return `Processing number input: ${input}`
      }else  {
          return `Processing boolean input: ${input}`
      }
}

// 练习3：字面量类型和const断言

// 任务：创建一个主题配置，使用字面量类型和const断言
const themeConfig = {
  primary: "blue",
  secondary: "gray",
  mode: "light"
} as const;

// 基于 themeConfig 创建类型
type ThemeConfig = typeof themeConfig;
console.log(themeConfig)


type fnConstType = (tc:ThemeConfig) => string

let fnCost : fnConstType = (input:ThemeConfig) =>{
  return `${input.mode}  ${input.primary}  ${input.secondary}`
}

console.log(fnCost(themeConfig))