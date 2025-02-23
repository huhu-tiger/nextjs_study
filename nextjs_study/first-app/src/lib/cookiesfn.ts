import Cookies from 'js-cookie'

// 获取 cookie 时添加日志
const getCookie = (name: string) => {
  const value = Cookies.get(name)
  console.log(`Getting cookie ${name}:`, value)
  return value
}

export default function cookiesfn() {
  // 获取所有 cookies
  const allCookies = Cookies.get()
  console.log('All available cookies:', allCookies)
  
  // 获取特定 cookies
  const token = getCookie('token')
  const login = getCookie('login')
  const timestamp = getCookie('timestamp')
  
  // 设置 cookie
  const setCookie = async (name: string, value: string) => {
    console.log(`Setting cookie: ${name} = ${value}`)
    await Cookies.set(name, value, { 
      expires: 7,
      path: '/',
      sameSite: 'lax', // 改为 lax，允许跨页面访问
      secure: process.env.NODE_ENV === 'production' // 只在生产环境启用 secure
    })
  }
  
  // 删除 cookie
  const removeCookie = (name: string) => {
    Cookies.remove(name, { path: '/' })
  }

  return {
    allCookies,
    token,
    login,
    timestamp,
    setCookie,
    removeCookie
  }
}