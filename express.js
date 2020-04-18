var express = require('express');
var app = express();
//body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
//创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
 
app.post('/process_post', urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   let toEmail = req.body.to_email
   let emailContent = req.body.email_content
   console.log(req.body)
   res.send("发送成功!")
   main(toEmail, emailContent)
})

const main = function(toEmail, emailContent){
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 以qq邮箱为例，smtp.qq.com
    port: 465, // SMTP端口
    secure: true, // true for 465, false for other ports
    auth: {
      user: "xxx", // 发件人邮箱
      pass: "xxx" // 发件人的smtp授权码
    }
  });
  // 邮件信息
  transporter.sendMail({
    from: '"大头" <1051558519@qq.com>', // 发件人邮箱
    to: toEmail, // 发送人邮箱，可多个
    subject: "测试测试测试 ✔", // 标题
    text: emailContent, // 内容
    html: "<b>"+emailContent+"</b>" // html body
  });
}

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})