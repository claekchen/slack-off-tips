'use strict';
const { showOperation } = require('./bin/show');
const request = require('request');
/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

async function requestfun() {
  //resData对象各属性请参考官方文档
  // https://work.weixin.qq.com/help?doc_id=13376
  var resData = {
    "msgtype": "text",
    "text": {
        "content": "需要发送的消息"
    }
  };

  var theContent = await showOperation()

  resData.text.content = theContent;
  //console.log(resData)
  // url 为企业机器人的webhook
  request({
    url: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=",
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(resData)
}, function (error, response, body) {
    console.log(response)
    console.log('提示成功！');
});
}
exports.handler = async (event, context, callback) => {
  await requestfun()
  callback(null, 'hello world');
}