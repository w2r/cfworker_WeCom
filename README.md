##### 说明

 	通过cf worker反代,把企业微信应用推送方式由post转换为get方式





 ##### 流程图如下：

![](https://s3.ax1x.com/2021/02/10/ywsTUO.png)





##### 操作步骤：

 1. 打开cf官网，选择workers，新建worker

 2. 把默认cf worker脚本区域代码清空， 复制cfworkers.js内容，粘贴到代码区域内

 3. 修改corpidid，agentid 和secret， cf worker地址（具体获得方式：[点我直达](https://github.com/w2r/hostloc2tg/blob/master/hostloc2wechat/README.md#%E4%BB%A5%E4%B8%8B%E4%BB%8B%E7%BB%8D%E7%9A%84%E6%98%AF%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E5%BA%94%E7%94%A8%E5%8F%AF%E4%BB%A5%E5%BE%AE%E4%BF%A1%E6%8E%A5%E4%BF%A1%E6%81%AF%E6%97%A0%E9%9C%80%E5%AE%89%E8%A3%85%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1)）

    ~~~~
    # 第一处修改地方
    # 标准获得token格式（请把*替换自己的corpidid和secret）
    https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=********&corpsecret=************
    （修改完手动测试链接是否正确，如果正确会返回token）
    
    # 第二处修改地方
    # 修改推送文本模板内的agentid（应用id）
    var template = 
     {
      // 可选择推送用户id，留空则默认全部成员推送
      "touser": "",
      "toparty": "1",
      "totag": "2",
      "msgtype": "text",
      // agentid
      "agentid": 1000003,
      "text": {
        // 发送文本内容
        "content": text
      },
      "safe": 0,
      "enable_id_trans": 0,
      "enable_duplicate_check": 0,
      "duplicate_check_interval": 1800
    }
    
      const init2 = {
        body: JSON.stringify(template),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      # 第三处修改地方
      # 把cfworker地址修改为你自己的（记得带上网址后面的/)
      var text = decodeURI(request.url.replace("https://********0615.workers.dev/", ""))

    
    ~~~~

    

 4.  验证能否发送推送，登录网页版企业微信，我的企业中找到微信插件，微信扫码关注，然后
     直接访问你的cfworker地址+推送内容（注意网址和推送内容之间斜杠不可省略）：

    
    # 格式类似如下：
    # 
    https://******-sound-f816.qyu0615.workers.dev/test
    
    # 正常返回如下
    {"errcode":0,"errmsg":"ok","invaliduser":"","invalidtag":"2"}
    

    







