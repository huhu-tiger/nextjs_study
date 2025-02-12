## 路由的基本使用

  1. 明确好界面中的导航区、展示区
  2. 导航区的a标签改为Link标签
    <Link to="/about">About</Link>
  3. 展示区写Route标签进行路径的匹配
    <Route path="/about" component={About}/>
  4. <App>的最外层包裹BrowserRouter

## 路由组件与一般组件区别
  1. 写法不同
   一般组件：<Demo/>
   路由组件：<Route path="/demo" component={Demo}/>
  2. 存放位置不同
   一般组件：在components文件夹中
   路由组件：在pages文件夹中
  3. 接收到的props不同
   一般组件：传递什么接收什么
   路由组件：接收到三个参数：history、location、match
        history:
          go: ƒ go(n)
          goBack: ƒ goBack()
          goForward: ƒ goForward()
          push: ƒ push(path, state)
          replace: ƒ replace(path, state)
        location:
          pathname: "/about"
          search: ""
          state: undefined
        match:
          params: {}
          path: "/about"
          url: "/about"
        
## NavLink 与封装NavLink
  1. NavLink 可以 实现路由链接的默认选中，即默认高亮
  2. 标签体内容是一个特殊的标签属性：children
  3. 通过this.props.children可以获取到标签体内容


## 12 多级路径 刷新页面样式丢失问题
  1. index.html 使用%PUBLIC_URL% 替换./
  2. 使用css cdn
  3. 使用hashRouter

## 13 路由的严格匹配与模糊匹配
  1. 默认使用模糊匹配
  2. 开启严格匹配：<Route exact={true} path="/home" component={Home}/>
  3. 严格匹配 不要随便使用，影响使用二级路由

## 14 默认路由
  1. 使用<Navigate to="/prefix/about" replace /> 实现默认路由 ，replace 表示替换当前路由, 
  react-router-dom 6.x.x 中使用Navigate
  react-router-dom 5.x.x 中使用Redirect

## 15 路由的嵌套
  1. 使用<Route>标签包裹<Route>标签
  2. 使用<Routes>标签包裹<Route>标签
  3. 使用<Navigate>标签包裹<Route>标签
  4. 使用<Link>标签包裹<Link>标签
  5. 使用<NavLink>标签包裹<NavLink>标签
  6. 使用<Switch>标签包裹<Route>标签
  7. 使用<Redirect>标签包裹<Route>标签
  8. path 使用相对路径，不需要 一级路由 前缀

## 16 路由组件传参,params
  1. params 使用useParams 获取动态路由参数
  2. path 使用相对路径，不需要 一级路由 前缀
  

## 17 路由组件传参,search
  1. search 使用useSearchParams 获取查询参数

  2. path 使用相对路径，不需要 一级路由 前缀
  3. 获取查询参数
    const [search, setSearch] = useSearchParams()
    console.log('查询参数:', search.get('id'))

## 18 路由组件传参,state
  1. state 使用useLocation 获取路由信息
  2. path 使用相对路径，不需要 一级路由 前缀
  3. 获取路由信息
    const location = useLocation()
    console.log('路由信息:', location.state)
  4. 刷新页面，state 数据不会丢失

## 19 push 与 replace
  1. 使用navigate(path, { replace: true }) 实现replace
  2. 使用navigate(path) 实现push

## 20 编程式路由导航方法说明
  1. 使用useNavigate 获取导航函数
  2. useNavigate 只能放在函数组件中
  


