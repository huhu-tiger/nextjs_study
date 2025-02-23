import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { type LoginVerify } from '@/types/next-dev'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { token, timestamp, login }: LoginVerify = await req.body
        
        // 重新生成 token 进行验证
        const secretKey = process.env.SECRET_KEY || 'your-secret-key'
        const expectedToken = crypto
            .createHash('md5')
            .update(`${timestamp}${login}${secretKey}`)
            .digest('hex')
            
        console.log(token, expectedToken, timestamp)
        // 验证 token
        if (token === expectedToken && timestamp) {
            // 检查 token 是否过期（例如：24小时）
            const now = Date.now()
            const tokenAge = now - Number(timestamp)
            const maxAge = 24 * 60 * 60 * 1000 // 24小时
            
            if (tokenAge > maxAge) {
                return NextResponse.json({ 
                    valid: false,
                    message: 'Token已过期'
                })
            }
            
            return res.status(200).json({ 
                valid: true,
                message: 'Token有效'
            })
        }
        
        return res.status(200).json({ 
            valid: false,
            message: 'Token无效'
        })
        
    } catch (error) {
        return res.status(200).json({ 
            valid: false,
            message: '验证失败',
            error: error instanceof Error ? error.message : '未知错误'
        })
    }
} 