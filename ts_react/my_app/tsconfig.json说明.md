```json
{
  "compilerOptions": {
    "target": "es5", // 指定 ECMAScript 目标版本。'es5' 表示输出将与 ES5 兼容。
    "lib": [
      "dom", // 包括 DOM 库，适用于浏览器相关的功能。
      "dom.iterable", // 为 DOM 类型添加可迭代功能。
      "esnext" // 包括最新的 ECMAScript 特性。
    ],
    "allowJs": true, // 允许将 JavaScript 文件包含在 TypeScript 项目中。
    "skipLibCheck": true, // 跳过声明文件（*.d.ts）的类型检查，以加速编译过程。
    "esModuleInterop": true, // 启用与非 ESModule 代码的兼容性，使其能够导入。
    "allowSyntheticDefaultImports": true, // 即使模块没有默认导出，也允许默认导入。
    "strict": true, // 启用所有严格的类型检查选项。
    "forceConsistentCasingInFileNames": true, // 强制文件名使用一致的大小写。
    "noFallthroughCasesInSwitch": true, // 确保 switch 语句中没有 fallthrough 的情况（即没有遗漏的 case）。
    "module": "esnext", // 设置模块系统为最新的 ES 模块标准。
    "moduleResolution": "node", // 指定模块解析方式。'node' 模式模拟 Node.js 的模块解析方式。
    "resolveJsonModule": true, // 允许将 JSON 文件作为模块导入。
    "isolatedModules": true, // 确保每个文件都被视为独立的模块，这对于与 Babel 或其他工具一起编译时非常有用。
    "noEmit": true, // 禁止 TypeScript 编译器输出文件（如 .js 文件）。
    "jsx": "react-jsx" // 指定 JSX 代码生成模式，适用于 React 17+（'react-jsx' 是新的 JSX 转换方式）。
  },
  "include": [
    "src" // 指定要包含在编译中的目录，这里是 'src' 文件夹。
  ]
}

```