let http = require("http");
let querystring = require("querystring");
let url = require("url");
http.createServer((req,res)=>{
    let data = "";
    if(req.method === "POST"){
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });

        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {

            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);

            /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

                //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
                //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
            var dataObject = querystring.parse(data);
            res.end(JSON.stringify(dataObject));
        });
    }else if(req.method === "GET" ){
        res.end(JSON.stringify(url.parse(req.url, true).query));
    }else {
        res.end("not get or post ");
    }

}).listen(3000);