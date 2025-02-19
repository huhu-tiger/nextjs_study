import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { token, timestamp, login } = await req.json()
        
        // 重新生成 token 进行验证
        const secretKey = process.env.SECRET_KEY || 'your-secret-key'
        const expectedToken = crypto
            .createHash('md5')
            .update(`${timestamp}${login}${secretKey}`)
            .digest('hex')
            
        // 验证 token
        if (token === expectedToken) {
            // 检查 token 是否过期（例如：24小时）
            const now = Date.now()
            const tokenAge = now - timestamp
            const maxAge = 24 * 60 * 60 * 1000 // 24小时
            
            if (tokenAge > maxAge) {
                return NextResponse.json({ 
                    valid: false,
                    message: 'Token已过期'
                })
            }
            
            return NextResponse.json({ 
                valid: true,
                message: 'Token有效'
            })
        }
        
        return NextResponse.json({ 
            valid: false,
            message: 'Token无效'
        })
        
    } catch (error) {
        return NextResponse.json({ 
            valid: false,
            message: '验证失败',
            error: error instanceof Error ? error.message : '未知错误'
        })
    }
} 