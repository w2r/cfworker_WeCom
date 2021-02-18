addEventListener('fetch', event => {
    event.respondWith(postWeChatUrl(event.request))
})

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else if (contentType.includes("application/text")) {
    return await response.text()
  }
  else if (contentType.includes("text/html")) {
    return await response.text()
  }
  else {
    return await response.text()
  }
}


async function postWeChatUrl(request) {
  // 自行修改企业id和秘钥（在url里面）以及应用id，推送人员, 你的cf worker址
  // 以下为需要修改区域
  // 企业id和秘钥
  const url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=*************&corpsecret=********************"
  // 应用id
  var agentid = *******
  // 你的cf地址，务必保证结尾含有"/""
  var cf_worker = "https://********.workers.dev/"
  
  // 设置推送用户，"@all"为全部人，多个用户用|链接，比如"A|B|C"
  var touser = "@all"
  // 以上为需要修改区域
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  }
  // 发出get请求获得token
  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  var jsonObj = JSON.parse(results)
  // 从cf worker请求提取发送内容
  var url2 = new URL(request.url);
  var form = url2.searchParams.get('form')
  // var content = url2.searchParams.get('content')
  // 解决推送内容含有&被截断的问题
  // 解决#的问题
  var reg = new RegExp( '%23' , "g" )
  var content = decodeURI(request.url.replace(cf_worker + "?form=" + form + "&content=", "")).replace(reg, "#")
  
  var key = jsonObj["access_token"]
  var wechat_work_url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + key;
  switch(form)
{
    // 测试通过
    // content为要推送的内容，支持html格式
    case "text":
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        var template = 
  {
  "touser": touser,
  "msgtype": "text",
  "agentid": agentid,
  "text": {
    "content": content
  },
  "safe": 0,
  "enable_id_trans": 0,
  "enable_duplicate_check": 0,
  "duplicate_check_interval": 1800
  }

        const init21 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response10 = await fetch(wechat_work_url, init21)  
        return  response10
        break;
    // 测试通过
    // 无用功能，需要上传微信服务器获得media_id
    // 发送的图片只能是media_id，具体获得方式百度微信临时素材上传
    // 素材只能保留三天
    case "photo":
        // content内容为media_id
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        var template = 
  {

    "touser" : touser,
    "toall" : 0,
   "msgtype" : "image",
   "agentid" : agentid,
   "image" : {
        "media_id" : content
   },
   "safe":0
}
        const init22 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response12 = await fetch(wechat_work_url, init22)  
        return  response12
        break;
    // 测试通过
    // 无用功能
    // 同photo
    case "video":
        // content内容为media_id，title，描述
        // 三个参数以分隔符|分开（切记你的内容里不要含有分割符号）
        // content内容为media_id|title|description
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        content_text = content.split("|")
        var template = 
  {
    "touser" : touser,
    "toall" : 0,
   "msgtype" : "video",
   "agentid" : agentid,
   "video" : {
        "media_id" : content_text[0],
        "title" : content_text[1],
       "description" : content_text[2]
   },
   "safe":0
}
        const init3 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response13 = await fetch(wechat_work_url, init3)  
        return  response13
        break;
    // 没试过，理论上和video一样
    // 没啥用
    case "voice":
        // content内容为media_id
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        var template = 
  {
    "touser" : touser,
    "toall" : 0,
   "msgtype" : "voice",
   "agentid" : agentid,
   "voice" : {
        "media_id" : content
   }
}
        const init23 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response14 = await fetch(wechat_work_url, init23)  
        return  response15
        break;
    // 测试通过
    case "textcard":
        // content内容为title|描述|链接，
        // 参数以分隔符|隔开
        // 描述内容支持html
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        content_text = content.split("|")
        var template = 
 {
    "touser" : touser,
    "toall" : 0,
   "msgtype" : "textcard",
   "agentid" : agentid,
   "textcard" : {
            "title" : content_text[0],
            //描述内容支持html
            "description" : content_text[1],
            "url" : content_text[2],
            // 微信端无用，直接删除
            // "btntxt":"更多"
   }
}

        const init4 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response15 = await fetch(wechat_work_url, init4)  
        return  response15
        break;
      
    // 测试通过
    case "file":
        // content内容为media_id
        // 同photo，文件需要上传到微信服务器
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        var template = 
  {
    "touser" : touser,
    "toall" : 0,
   "msgtype" : "file",
   "agentid" : agentid,
   "file" : {
        "media_id" : content
   },
   "safe":0,
   "enable_duplicate_check": 0,
   "duplicate_check_interval": 1800,
   "enable_id_trans":0,

}
        const init6 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response17 = await fetch(wechat_work_url, init6)  
        return  response17
        break;

    
    case "markdown":
        if (!content)
        return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        var template = 
  {
   "touser" : touser,
   "toall" : 0,
   "msgtype" : "markdown",
   "agentid" : agentid,
   "markdown": {
        "content": content
   }
}

        const init7 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response18 = await fetch(wechat_work_url, init7)  
        return  response18
        break;

    // 已调试成功通过！
    // 注意四个参数要用连接符号|连接起来，
    
    case "photo_text":
        // content内容为连接符号连接的四个参数
        // 四个参数分为title|描述|跳转链接|图片链接, 
        // 参数以分隔符|隔开
        if (!content){
          return new Response('content内容为空，请重新发送！', {
            status: 200
        });
        }
        // 根据分隔符分割内容，还原成四个参数
        content_text = content.split("|")
        var template = 
  {
    "touser" : touser,
    "toall" : 0,
   "msgtype" : "news",
   "agentid" : agentid,
   "news" : {
       "articles" : [
           {
               "title" : content_text[0],
               "description" : content_text[1],
               "url" : content_text[2],
               "picurl" : content_text[3],
               // btntxt在微信端无效，需要在企业微信才会显示，不建议使用
               // "btntxt":"点击了解更多"
           }
        ]
   }
}

        const init8 = {
          body: JSON.stringify(template),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }

        // 发送post请求
        const response19 = await fetch(wechat_work_url, init8)  
        return  response19
        break;
    default:
        return new Response(form + '为不存在的格式，请重新发送！', {status: 200})
        break
}
}
