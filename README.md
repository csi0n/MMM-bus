### 树莓派[魔镜](https://github.com/MichMich/MagicMirror)

#### Bus模块

使用到的Api(从上海公交抓取的，仅供学习使用)

```bash
http://xxbs.sh.gov.cn:8080/weixinpage/HandlerBus.ashx
```

具体使用到的lineid,name,stopid需要自己抓取

#### 使用

`config/config.js`modules中加入:

```js
{
	module:"bus",
	position:"top_right"
}
```



#### 效果

![](http://img.csi0n.com/2017-10-26/59f13ae30a2f11508981475.png)

#### 感谢

@yawnsde 提供的[node_helper](https://github.com/yawnsde/MMM-RNV/blob/master/node_helper.js)模块解决JS跨域问题



