
# star-initReact

A boilerplate with react, redux, react-router, ant-design, webpack, webpack-dev-server, babel, css-modules ...

## 全局安装脚手架脚本

```bash
$ sudo npm i -g star-initReact (如果是window系统请使用系统管理员权限执行cmd)
```
## 准备环境

```bash

$ mkdir app && cd app
$ star-initReact

```

想要更好的开发体验，还需安装两个 Chrome 插件：[Redux DevTools](https://chrome.google.com/webstore/detail/lmhkpmbekcpmknklioeibfkpmmfibljd) 和 [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) 。

## 启动调试

```bash
$ npm run dev
```

## 打包构建代码

```bash

// 生成国际化文件供配置
$ npm run build:i18n-js

// 配置国际化文件后打包构建生成最终部署代码
$ npm run build

```

## 目录结构

```
.
├── /dist/               # 构建输出的文件会在这里
├── /scripts/            # 生成国际化配置文件脚本
├── /node_modules/       # 第三方类库和工具
├── /src/                # 应用源码
├ ├── /assets/           # 静态资源文件
│ ├── /components/       # React components
│ ├── /entries/          # 应用入口
│ ├── /locale/           # 国际化配置文件,会自动生成
│ ├── /route/            # 路由信息
│ ├── /store/            # redux 
│ ├── /styles/           # 全局样式 
│ ├── /temp/             # 临时文件，会自动生成
│ └── /views/            # 页面组件
├── .babelrc             # 配置 babel
├── webpack.config.js    # 扩展开发调试 webpack 配置
├── webpack.production.config.js    # 扩展打包构建 webpack 配置
└── package.json         # 配置入口文件、依赖和 scripts
```


## 内置类库

- [react](https://github.com/facebook/react)
- [redux](https://github.com/reactjs/redux)
- [redux-actions](https://github.com/acdlite/redux-actions)
- [react-router](https://github.com/reactjs/react-router)
- [classnames](https://github.com/JedWatson/classnames)
- [react-router](https://github.com/reactjs/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)

## 工具特性

热替换和 LiveReload

> 基于 [Webpack Vanilla HMR](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)，支持 `components`, `router`, `views` 目录的模块热替换，其余目录的修改则会自动刷新页面。

> CSS 的自动刷新需通过 [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) Chrome 插件配合使用。

> - [Why Vanilla HMR](https://github.com/reactjs/redux/pull/1455)

支持 css-modules

> src/components和src/views中的 less 文件会被解析为 css-modules

## License
MIT

