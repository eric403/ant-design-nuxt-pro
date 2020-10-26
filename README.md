<h1 align="center">Ant Design Nuxt Pro</h1>
<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a> and <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
</div>

<div align="center">
[![License](https://img.shields.io/npm/l/package.json.svg?style=flat)](https://github.com/eric403/ant-design-nuxt-pro/blob/master/LICENSE)
</div>

Overview
----

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 和 [Nuxt.js](https://nuxtjs.org)实现的快速开发脚手架, 5分钟快速搭建项目


环境和依赖
----

- node
- yarn
- eslint
- nuxt 2.14.x
- ant-design-vue 1.6.x



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/eric403/ant-design-nuxt-pro.git
cd ant-design-nuxt-pro
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn dev
```

- 编译项目
```
yarn build
yarn start
```

- Lints and fixes files
```
yarn lint --fix
```


功能说明
----
- 基本的nuxt + ant design vue脚手架
- 基于middleware的权限控制
- axios拦截
- 菜单权限控制
- 多用户多布局
- 登录登出
- 错误页面
- 基本的API示例
- 简单的CRUD页面, 支持URL参数和页面刷新


其他说明
---
- 仅包含最基本的功能, 最快的速度投入使用
- 业务组件或通用组件请自行封装
- 权限控制仅使用了单角色, 更复杂的功能请自行修改middleware/auth.js, plugins/auth.js, store/index.js
- 菜单配置请修改layouts页面中的menus
- nuxtjs 3.0发布后改用Vue 3.0和ant-design-vue 2.0改写
