ui组件：antdesign
框架搭：react 
开发结构工具：vite

建议目录结构
    src 目录结构:
    |-- assets //静态资源
      | | -- images |  // 分俩个主要有时候自己可能会搞糊涂那个是icon图，那个是img图
      | | -- icon   |   
      | | -- index.js //引入图片
    |-- config //配置目录
    | |-- Config //包含 SERVER_HOME 和 IS_DEBUG
      | |-- Enum //常量配置
    |-- models //models 目录
      | |-- index //引用全部 models
    |-- pages //页面目录
    |-- main //主页面，包含初始化 dva 的 initModels 和 initRequest，页面路由建立
    |-- utils // 公共使用工具方法
    |-- component // 公用组件，建议是已一个文件夹包一个index.jsx

开发启动脚本指令
调试开发指令：npm run dev 
项目打包指令：npm run build