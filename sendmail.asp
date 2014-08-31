<%@ CODEPAGE=65001 %>
<% Response.CodePage=65001%>
<% Response.Charset="UTF-8" %>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>

<%
Dim SendStat
SendStat = Jmail("five_yu@sina.com","一条来自ITS网站的留言","GB2312","text/html")
Response.Write SendStat
%>

<%
'--------------------------------------------------------------------
'Function Jmail(mailTo,mailTopic,mailBody,mailCharset,mailContentType)
Function Jmail(mailTo,mailTopic,mailCharset,mailContentType)
'--------------------------------------------------------------------
'JMail
'--------------------------------------------------------------------
'入口参数：
'　　　　mailTo 收件人email地址
'　　　　mailTopic 邮件主题
'　　　　mailBody 邮件正文(内容)
'　　　　mailCharset 邮件字符集，例如GB2312或US-ASCII
'　　　　mailContentType 邮件正文格式，例如text/plain或text/html
'返回值：
'　　　　字符串，发送成功后返回OK，不成功返回错误信息
'使用方法：
'　　　　1)设置好常量，即以Const开头的变量
'　　　　2)使用类似如下代码发信
'Dim SendStat
'SendStat = Jmail("aa@163.com","测试Jmail","这是一封<br/>测试信！","GB2312","text/html")
'Response.Write SendStat
'--------------------------------------------------------------------

'***************根据需要设置常量开始*****************
Dim ConstFromNameCn,ConstFromNameEn,ConstFrom,ConstMailDomain,ConstMailServerUserName,ConstMailServerPassword

ConstFromNameCn = "itssim.com"'发信人中文姓名(发中文邮件的时候使用)，例如'张三'
ConstFromNameEn = "itssim.com"'发信人英文姓名(发英文邮件的时候使用)，例如'zhangsan'
ConstFrom = "1073050691@qq.com"'发信人邮件地址，例如'zhangsan@163.com'
ConstMailDomain = "smtp.qq.com"'smtp服务器地址，例如smtp.163.com
ConstMailServerUserName = "1073050691"'smtp服务器的信箱登陆名，例如'zhangsan'。注意要与发信人邮件地址一致！
ConstMailServerPassword = "262302zw"'smtp服务器的信箱登陆密码
'***************根据需要设置常量结束*****************

'-----------------------------以下内容无需改动------------------------------
On Error Resume Next
Dim myJmail,CLStr
CLStr=Chr(13)&Chr(10)
Set myJmail = Server.CreateObject("JMail.Message")
myJmail.Logging = True'记录日志
myJmail.ISOEncodeHeaders = False'邮件头不使用ISO-8859-1编码
myJmail.ContentTransferEncoding = "base64"'邮件编码设为base64
myJmail.AddHeader "Priority","3"'添加邮件头,不要改动！
myJmail.AddHeader "MSMail-Priority","Normal"'添加邮件头,不要改动！
myJmail.AddHeader "Mailer","Microsoft Outlook Express 6.00.2800.1437"'添加邮件头,不要改动！
myJmail.AddHeader "MimeOLE","Produced By Microsoft MimeOLE V6.00.2800.1441"'添加邮件头,不要改动！
myJmail.Charset = mailCharset
myJmail.ContentType = mailContentType

If UCase(mailCharset) = "GB2312" Then
myJmail.FromName = ConstFromNameCn
Else
myJmail.FromName = ConstFromNameEn
End If

myJmail.From = ConstFrom
myJmail.Subject = mailTopic
'myJmail.Body = mailBody
myJmail.HTMLBody="ITS网站留言"&CLStr&CLStr
myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者姓名："&Request.Form("name")&CLStr

select case Request.Form("career")
	case 1
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：本科在读"&CLStr
	case 2
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：硕士在读"&CLStr
	case 3
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：博士在读"&CLStr
	case 4
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：高校科研工作者"&CLStr
	case 5
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：交通行业从业人员"&CLStr
	case 6
		myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业：其他"&CLStr
end select
'myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者职业："&Request.Form("career")&CLStr
myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言者邮箱："&Request.Form("email")&CLStr
myJmail.HTMLBody=myJmail.HTMLBody&"<br>留言内容:<br>"
myJmail.HTMLBody=myJmail.HTMLBody&"<div style='font:16px;background-color:#FCC'>"&Request.Form("comment")&CLStr
myJmail.HTMLBody=myJmail.HTMLBody&"</div>"
myJmail.AddRecipient mailTo
myJmail.MailDomain = ConstMailDomain
myJmail.MailServerUserName = ConstMailServerUserName
myJmail.MailServerPassword = ConstMailServerPassword
myJmail.Send ConstMailDomain
myJmail.Close
Set myJmail=nothing

If Err Then 
Jmail=Err.Description
Err.Clear
Else
Jmail="<script language=javascript>alert('您的留言已提交，我们会尽快处理！感谢访问本网站！');location='contact.html';</script>"
End If

On Error Goto 0
End Function
'--------------------------------------------------------------------
%>





      

</body>
</html>

