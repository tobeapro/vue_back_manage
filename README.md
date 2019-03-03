## vue+express+mongodb+mongoose的博客发布系统
### 如何运行
#### 1、安装
```
yarn install 
yarn serve
```
后台原先在该项目`server`目录下，后面为方便修改，新建了一个[新项目](https://github.com/tobeapro/my-node-server)保存服务端代码

#### 2、后台预览
##### 2.1 登录页
![登录页](https://tobeapro.github.io/static/img/my_blog_1.png)
##### 2.2 个人信息
![登录页](https://tobeapro.github.io/static/img/my_blog_2.png)
##### 2.1 文章列表
![登录页](https://tobeapro.github.io/static/img/my_blog_3.png)
##### 2.1 文章修改操作
![登录页](https://tobeapro.github.io/static/img/my_blog_4.png)

#### 3、总结，其他依赖
##### 3.1 使用`express-session`node的session鉴权方案
##### 3.2 使用`svg-captcha`node实现的svg验证码
##### 3.3 使用`mavon-editor`富文本编辑器插件
##### 3.4 使用`formidable`上传图片的第三方插件
