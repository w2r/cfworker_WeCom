##### 说明

 	通过cf worker反代,把企业微信应用推送方式由post转换为get方式
  
  代码更新：
  
  20210218： 解决#造成内容截断的问题，#代表网页中的一个位置，其后面的字符，就是该位置的标识符，所以当你的content含有#号时，cf worke的request.url是没有#后面内容，若想发送完整的内容，需要酱content内的#进行url编码（将#全部替换成%23）





 ##### 流程图如下：

![](https://s3.ax1x.com/2021/02/10/ywsTUO.png)





##### 操作步骤：

 1. 打开cf官网，选择workers，新建worker

 2. 把默认cf worker脚本区域代码清空， 复制cfworkers.js内容，粘贴到代码区域内

 3. 修改corpidid，agentid 和secret， cf worker地址（具体获得方式：[点我直达](https://github.com/w2r/hostloc2tg/blob/master/hostloc2wechat/README.md#%E4%BB%A5%E4%B8%8B%E4%BB%8B%E7%BB%8D%E7%9A%84%E6%98%AF%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E5%BA%94%E7%94%A8%E5%8F%AF%E4%BB%A5%E5%BE%AE%E4%BF%A1%E6%8E%A5%E4%BF%A1%E6%81%AF%E6%97%A0%E9%9C%80%E5%AE%89%E8%A3%85%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1)）



##### 推送示例:

1. 推送text

    content内容为要推送的文本，支持部分html，比如a标签，其他自测

~~~
https://****************.workers.dev/?form=text&content=测试字体
~~~

测试图：

![](https://s3.ax1x.com/2021/02/17/y2GTN8.jpg)

2. 推送photo（不建议使用，下文有替代方法）

    content内容为media_id（需要自己上传图片到微信服务器，获得media_id，素材仅保留三天，具体api介绍：[上传临时素材 - 企业微信API (qq.com)](https://work.weixin.qq.com/api/doc/90000/90135/90253)）

~~~
https://*****************.workers.dev/?form=photo&content=3sfsiLDF38fDvrJQ-mYTxzJPLjI1baq7SWI6h0KyeOm5_sh_oszzwI8DiKbMb-s_8
~~~

![](https://s3.ax1x.com/2021/02/17/y2YCZt.jpg)

3. 推送video

    同photo类似， 需要自己上传图片到微信服务器，获得media_id

    content内容包含三个参数，分别为media_id，title，description（顺序要保持正确），各参数以分隔符|隔开
    
    务必保证是三个参数以|分隔符分开，否则无法提取

~~~~
https://******************.workers.dev/?form=video&content=3DZrNS9ftgjSHX157nwp96EIAQHgHwh_x1_YsFuUH0irMDqNxr2IqusgK18kzujCF|测试视频|银河之上，皆为神明
~~~~

![](https://s3.ax1x.com/2021/02/17/y2YNLR.jpg)



4. 推送voice

    同photo， content内容为media_id（没有测试图，垃圾接口仅支持amr格式语音，懒得搞）

~~~
https://******************.workers.dev/?form=voice&content=**********
~~~



5. 推送textcard

    content内容包含三个参数，分别为title，description，url（顺序要保持正确），各参数以分隔符|隔开

    描述内容支持部分html

~~~
https://*****************.workers.dev/?form=textcard&content=欢迎来到hostloc|还有这里只探讨主机相关话题，其他无关言论不要在此发表，否则浪费的是版主们的时间，还有你们的ID，更重要得是会浪费你们的打字时间。此地非IDC的公告区。
|https://www.hostloc.com/forum-45-1.html
~~~

![](https://s3.ax1x.com/2021/02/17/y2tg9U.jpg)



6. 推送file

    同photo，需上传文件到微信服务器，content内容为media_id

    ~~~
    https://****************.workers.dev/?form=file&content=3qddaGll_yvGF5Sa4PQFcc525VvxsgZSLY6jR2b2j0i0
    ~~~

![](https://s3.ax1x.com/2021/02/17/y2UPd1.jpg)

7. 推送markdown(微信端不支持)

    content为markdown内容，markdown语法地址：https://work.weixin.qq.com/api/doc/90000/90135/90250#10167/%E6%94%AF%E6%8C%81%E7%9A%84markdown%E8%AF%AD%E6%B3%95

    发送内容微信端不支持，仅支持企业微信

~~~
https://******************.workers.dev/?form=markdown&content=markdown内容
~~~

8. 推送photo_text（可取代推送图片）

    content内容为连接符号连接的四个参数，title， description， url，picurl，参数用分隔符链接

    需要先把图片上传到图床获得图片链接

~~~
https://********************.workers.dev/?form=photo_text&content=欢迎来到hostloc|这是一个跳向hostloc的图片|https://www.hostloc.com/forum-45-1.html|https://s3.ax1x.com/2021/02/17/y2U7lD.jpg
~~~

![](https://s3.ax1x.com/2021/02/17/y2a37R.jpg)

友情提示：前三个参数设置为空格，约等于发送图片（就是图片布局有点别扭）

~~~
https://*********************.workers.dev/?form=photo_text&content= | | |https://s3.ax1x.com/2021/02/17/y20sE9.jpg
~~~

![](https://s3.ax1x.com/2021/02/17/y20huD.jpg)

PS： 部分需要上传文件到微信服务器获得media_id，该media_id仅三天内有效
media_id在同一企业内应用之间可以共享

**请求方式：**POST（**HTTPS**）
**请求地址：**https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=TYPE

使用multipart/form-data POST上传文件， 文件标识名为”media”

| 参数         | 必须 | 说明                                                         |
| ------------ | ---- | ------------------------------------------------------------ |
| access_token | 是   | 调用接口凭证                                                 |
| type         | 是   | 媒体文件类型，分别有图片（image）、语音（voice）、视频（video），普通文件（file） |







