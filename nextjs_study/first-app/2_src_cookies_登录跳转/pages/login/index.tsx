import { Form, Input, Button, message } from 'antd'
import { useRouter } from 'next/navigation'
import { type LoginRes, type Login, type LoginVerifyRes } from '@/types/next-dev'
import cookiesfn from '@/lib/cookiesfn'
export default function LoginPage() {
  const router = useRouter()

  const onFinish = async (values: Login) => {
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
        if (resData.token && resData.timestamp && resData.login) {
          console.log('Setting cookies with values:', {
            token: resData.token,
            timestamp: resData.timestamp.toString(),
            login: resData.login
          })
          
          // 使用类型断言确保这些值不是 undefined
          const token = resData.token as string
          const timestamp = resData.timestamp as number
          const login = resData.login as string
          
          // 使用 Promise.all 确保所有 cookie 都设置完成
          await Promise.all([
            new Promise(resolve => {
              cookiesfn().setCookie('token', token)
              resolve(true)
            }),
            new Promise(resolve => {
              cookiesfn().setCookie('timestamp', timestamp.toString())
              resolve(true)
            }),
            new Promise(resolve => {
              cookiesfn().setCookie('login', login)
              resolve(true)
            })
          ])
          
          // 验证 cookies 设置成功后再跳转
          const cookies = cookiesfn()
          console.log('cookies:', cookies)
          if (cookies.token && cookies.timestamp && cookies.login) {
 
              message.success('Cookie 设置成功')
              await new Promise(resolve => setTimeout(resolve, 1000))
              router.push('/blog')
          }else{
            message.error('Cookie 设置失败')
          }
        } else {
          message.error('登录失败：缺少必要的响应数据')
          console.error('Missing response data:', resData)
        }
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
            name="login"
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