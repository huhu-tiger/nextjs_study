'use client'

import { Form, Input, Button, message } from 'antd'
import { useRouter } from 'next/navigation'
import { type LoginRes } from '@/types/next-dev'

export default function LoginPage() {
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      const response: Response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const resData: LoginRes = await response.json()
      console.log(resData)
      
      if (response.ok) {
        message.success('登录成功')
        // 在客户端设置 cookie
        document.cookie = `token=${resData.token}; path=/`
        router.push('/dashboard')
      } else {
        message.error('登录失败')
      }
    } catch (error) {
      console.error('登录错误:', error)
      message.error('登录出错')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录系统
          </h2>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}