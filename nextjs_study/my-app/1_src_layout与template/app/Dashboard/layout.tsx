'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
import { useState } from "react";
import { usePathname } from "next/navigation";


const linkData = [
    {
        name: 'About',
        href: '/Dashboard/about'
    },
    {
        name: 'Settings',
        href: '/Dashboard/settings'
    }
]

export default function DashboardLayout({
    children,  // children 参数接收子组件
}: Readonly<{  // 使用 Readonly 确保 props 类型不可变
    children: React.ReactNode;  // 定义 children 的类型为 React 节点
}>) {
    const [count, setCount] = useState(0);
    const pathname = usePathname();
    return (
        // 定义基本的 HTML 结构
        <div className="border-2 border-dashed border-black p-4 w-1/2 mx-auto mt-10">
            <h2>我是Dashboard Layout 我的目录路径是{"src/app/Dashboard/Layout.tsx"}</h2>
            <div className="flex gap-4 font-bold text-lg mb-4 text-purple-500">
                  {linkData.map((item, index) => (
                    <Link key={index} className={pathname === item.href ? 'text-purple-700' : ''} href={item.href}>{item.name}</Link>
                  ))}
            </div>
            <h2>Dashboard Layout 组件的计数器{count}</h2>
            <button className="bg-black text-white p-2 my-4 rounded-md" onClick={() => setCount(count + 1)}>点击我+1</button>
        
            {children}
        </div>
    );
}
