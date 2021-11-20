import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, render_template, Response, request, redirect, url_for
try:
    from flask_cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)
    from flask_cors import CORS
app = Flask(__name__) 
CORS(app, resources=r'/*')
@app.route("/") 
def application(environ, start_response):
  if environ['REQUEST_METHOD'] == 'OPTIONS':
    start_response(
      '200 OK',
      [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        ('Access-Control-Allow-Methods', 'POST,GET'),
      ]
    )
    return ''
    
@app.route("/sendSchool", methods=['GET','POST']) 
def sendSchool():
    receiver = request.args.get('email')
    id = request.args.get('id')
    schoolName = request.args.get('schoolName')
    schoolType = request.args.get('schoolType')
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    smtp = smtplib.SMTP()
    smtp.connect('smtp.163.com',25)
    sender = 'swen_test@163.com'
    pwd = 'YUZJYCQAMKATKMXM'
    smtp.login(sender, pwd)
    print("yes")
    msg = MIMEMultipart('mixed')
    content = "Expression of Interest Acceptance ID : {}\n School Name : {}\n School Type : {}\n startDate : {}\nendDate : {}".format(id,schoolName,schoolType,startDate,endDate)
    def write_email(msg,receiver,msg_type,msg_content,sender):
        msg['From'] = '{} <{}>'.format(sender,sender)
        #收件人为多个收件人,通过join将列表转换为以;为间隔的字符串
        msg['To'] = receiver
        msg['Subject'] = "Expression of Interest Acceptance {} has been scheduled!".format(id)
        # self.msg['Date']= time.time()
        content = MIMEText(msg_content, msg_type,'utf-8')
        msg.attach(content)
    def send(msg,smtp,receiver,msg_type,msg_content,sender):
        try:
            write_email(msg,receiver,msg_type,msg_content,sender)
            print("sure")
            smtp.sendmail(sender, receiver,msg.as_string())
            smtp.quit()
            print("success sending")
        except:
            return False
    # text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.baidu.com"
    send(msg,smtp,receiver,'plain',content,sender)
    print("++++++++++++++++++++++++=")
    return "Success to intimate to Moderator!\nPlease waite to get schedule!"
@app.route("/send", methods=['GET','POST']) 
def sendAdmin():
    print('Hi')
    schoolName = request.args.get('schoolName')
    address =  request.args.get('address')
    schoolType = request.args.get('schoolType')
    message = request.args.get('message')
    print('message',message)
    smtp = smtplib.SMTP()
    smtp.connect('smtp.163.com',25)
    sender = 'swen_test@163.com'
    pwd = 'YUZJYCQAMKATKMXM'
    smtp.login(sender, pwd)
    print("yes")
    msg = MIMEMultipart('mixed')


    content = "There is a new  expression of interest has come for scheduling.\nPlease sign into the web to roster a schedule.\n School Name : {}\n Address : {}\n School Type : {}\n Message : {}".format(schoolName,address,schoolType,message)
        
        
    def send(msg,smtp,receiver,content,sender):
        msg['From'] = '{} <{}>'.format(sender,sender)
        #收件人为多个收件人,通过join将列表转换为以;为间隔的字符串
        msg['To'] = receiver
        msg['Subject'] = 'There is a new  expression of interest has come for scheduling. \nPlease sign into the web to roster a schedule.'
        # self.msg['Date']= time.time()
        try:
            attachContent = MIMEText(content, 'plain','utf-8')
            msg.attach(attachContent)
            print("sure")
            smtp.sendmail(sender, receiver,msg.as_string())
            smtp.quit()
            print("success sending")
        except:
            return False
    # text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.baidu.com"
    send(msg,smtp,'swenadmin@126.com',content,sender)
    print("++++++++++++++++++++++++=")
    return "Success to intimate to Moderator!\nPlease waite to get schedule!"
if __name__=="__main__":
    app.run(host="0.0.0.0", port=8090)
# e =EmailSender()
# text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.baidu.com"
# e.send('2300936182@qq.com','plain',text)