import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { type Login } from '@/types/next-dev'

export async function POST(req: Request) {
    const { login, password }: Login = await req.json()
    console.log(login, password)
    const res = await db.readLogin({login, password})
    console.log(res)
    
    if (res.length > 0) {
        // 生成 token (md5加密：时间戳 + 用户名 + 密钥)
        const timestamp = Date.now()
        const secretKey = process.env.SECRET_KEY || 'your-secret-key'
        const token = crypto
            .createHash('md5')
            .update(`${timestamp}${login}${secretKey}`)
            .digest('hex')
            
        return NextResponse.json({ 
            message: '登录成功',
            token,
            timestamp
        })
    } else {
        return NextResponse.json({ message: '登录失败' })
    }
}