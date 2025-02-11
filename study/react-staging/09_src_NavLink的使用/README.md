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
        



