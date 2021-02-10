# cfworkers_WeCom
一个简易的在线撸代码程序
##### 说明

 	企业微信应用推送仅支持post方式，通过cf workers反代，转换为get方式

##### 操作步骤：

 1. 打开cf官网，选择workers，新建worker

 2. 把默认cfworkers脚本区域代码清空， 复制cfworkers.js内容，粘贴到代码区域内

 3. 修改内容，corpidid，agentid 和secret

    ~~~~
    # 第一次修改地方
    # 标准获得token格式（请替换自己的corpidid和secret）
    https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=********&corpsecret=************
    （修改完手动测试链接是否正确，如果正确会返回token）
    
    # 第二处修改地方
    # 修改agentid
    var template = 
     {
      // 可选择推送用户id，留空则默认全部成员推送
      "touser": "",
      "toparty": "1",
      "totag": "2",
      "msgtype": "text",
      // 应用id
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
    
    ~~~~

    

 4.  验证能否发送推送，直接访问你的cfworker地址+推送内容（注意网址和推送内容之间要有一个斜杠）：

    ~~~
    # 格式类似如下：
    https://******-sound-f816.qyu0615.workers.dev/test
    
    # 正常如下
    {"errcode":0,"errmsg":"ok","invaliduser":"","invalidtag":"2"}
    ~~~

    







