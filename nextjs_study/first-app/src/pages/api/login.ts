import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/db'
import crypto from 'crypto'
import { type Login } from '@/types/next-dev'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { login, password }: Login = await req.body
    console.log(login, password)
    const dbres = await db.readLogin({login, password})
    console.log(dbres)
    
    if (dbres.length > 0) {
        // 生成 token (md5加密：时间戳 + 用户名 + 密钥)
        const timestamp = Date.now()
        const secretKey = process.env.SECRET_KEY || 'your-secret-key'
        const token = crypto
            .createHash('md5')
            .update(`${timestamp}${login}${secretKey}`)
            .digest('hex')
        


        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Max-Age=${24 * 60 * 60 * 1000}; Path=/`)
        res.setHeader('Set-Cookie', `timestamp=${timestamp}; HttpOnly; Secure; Max-Age=${24 * 60 * 60 * 1000}; Path=/`)
        
        
        return res.status(200).json({ 
            message: '登录成功',
            token,
            timestamp
        })
        
    } else {
       return res.status(401).json({ message: '登录失败' })
    }
    res.status(200).json({ message: "Hello, World!" });
}
