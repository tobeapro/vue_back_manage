## vue+koa+ts+mongodb+mongoose的博客发布系统
### 如何运行

#### 1、安装
##### 1.1 首先要先安装启动Mongodb
[这是我个人记录的配置方法](http://www.amz715.com/detail/5cbc0e1e5f3f0a1ce036ebff)
##### 1.2 运行服务 
后台原先在该项目`server`目录下，后面为方便修改，新建了一个[新项目](https://github.com/tobeapro/blog-server)保存服务端代码,去安装启动
```
yarn install
yarn dev
```
##### 1.3 最后再安装启动这个后台页面
```
yarn install 
yarn serve
```

#### 2、后台预览
##### 2.1 登录页
![登录页](https://tobeapro.github.io/static/img/my_blog_1.png)
##### 2.2 个人信息
![登录页](https://tobeapro.github.io/static/img/my_blog_2.png)
##### 2.3 文章列表
![登录页](https://tobeapro.github.io/static/img/my_blog_3.png)
##### 2.4 文章修改操作
![登录页](https://tobeapro.github.io/static/img/my_blog_4.png)
##### 2.5 用户管理
##### 2.6 评论管理

#### 3、总结，其他依赖
> [后端代码地址](https://github.com/tobeapro/blog-server)
##### 3.1 使用`koa-session`node的session鉴权方案
##### 3.2 使用`svg-captcha`node实现的svg验证码
##### 3.3 使用`mavon-editor`富文本编辑器插件
##### 3.4 使用`koa-body`解析参数、上传图片的第三方插件

#### 4 更新
`2020-1-27` 增加评论管理

