'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";


// RootLayout 是 Next.js 应用的根布局组件
// 它包装了应用中的所有页面组件
export default function DashboardTemplate({
    children,  // children 参数接收子组件
}: Readonly<{  // 使用 Readonly 确保 props 类型不可变
    children: React.ReactNode;  // 定义 children 的类型为 React 节点
}>) {
    const [count, setCount] = useState(0);
    return (
        // 定义基本的 HTML 结构
        <div className="border-2 border-dashed border-yellow-500 p-4  mx-auto mt-10">

            <h2>Dashboard Template 组件的计数器{count}</h2>
            <button className="bg-black text-white p-2 my-4 rounded-md" onClick={() => setCount(count + 1)}>点击我+1</button>
        
            {children}
        </div>
    );
}
