# 抖音运营平台

体验地址：http://www.yesapi.top

## 运行效果截图
登录页：  
![](http://cdn7.okayapi.com/yesyesapi_20191202115358_6894d4f385f481f46a735f0707373ae6.png)  

首页：  
![](http://cdn7.okayapi.com/yesyesapi_20191202115424_a2594e94026a78149329a87c75945939.png)  
![](http://cdn7.okayapi.com/yesyesapi_20191202115443_a4d3642f8b742f81650bd3d93a704f11.png)  

我的视频：  
![](http://cdn7.okayapi.com/yesyesapi_20191202115530_828f2c2fa953ed2dd443c72307bea18d.png)  

粉丝页：  
![WX20191202-114146](http://cdn7.okayapi.com/yesyesapi_20191202115504_33d7237f7950df993acdf7fc9585c8e0.png)  

关注页：  
![WX20191202-114157](http://cdn7.okayapi.com/yesyesapi_20191202115557_254050192ce90f3e12c31a255165e366.png)  

统计页：  
![WX20191202-114235](http://cdn7.okayapi.com/yesyesapi_20191202115619_aba953f5ebd8a20e1beab75f2c3bb923.png)  

## nginx配置

```
server {
    listen       80;
    server_name  www.yesapi.top;

    location / {
        root   /path/to/www.yesapi.top/dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html last;
    }

    access_log /var/log/nginx/www.yesapi.top.access.log;
}
```

## 依赖

+ 抖音开放平台（需要注册申请认证）：https://open.douyin.com/platform
+ 小白开放平台（免费注册、免费使用，用于存放数据）：http://open.yesapi.cn/
+ Vue前端开源框架：https://cn.vuejs.org/
+ 基于PhalApi开源接口框架的API域（前后端分离，配套使用）：
