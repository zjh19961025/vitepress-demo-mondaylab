## 描述

​		一个月之前我研究博客搭建，然后申请了一个有效期为一个月的token，在这一个月期间没有什么问题。直到昨天我token过期，发现自动部署失效，于是研究了几个小时，有了这篇文章。

## 解决方法

1. 点击github个人头像，选择setting
2. 跳转页面后选取左侧Developer setting菜单（最后一个）
3. 跳转后选择 Psonal access token 菜单下面的最后一个 Tokens
4. 点击右侧Gennerate new token 如图
    ![vue8.png](..%2Fpublic%2Fimg%2Fvue8.png)
5. 选择过期时间的时候选择一个合适的，我是直接选择了一年
6. 创建完以后复制这个token
7. 回到你部署项目的页面点击Settings
8. 点击左侧Secrets and variables => Action 然后看到这样的页面 设置完以后重新提交即可自动部署
![vue9.png](..%2Fpublic%2Fimg%2Fvue9.png)
