let querystring = require("querystring");
let url = require("url");
let http = require("http");
let https = require("https");
class httpObj {
    constructor(sUrl,data){
        this.data = data;
        this.url = sUrl;
        this.urlObj = url.parse(this.url,true);
        if(this.urlObj.protocol && this.urlObj.protocol === "https:"){
            this.fn = https;
            this.defaultPort = 443;
        }else{
            this.fn = http;
            this.defaultPort = 80;
        }
    }
    post(){
        let promise = new Promise((resolve , reject)=>{
            const postData = querystring.stringify(this.data);
            const options = {
                hostname: this.urlObj.hostname,
                port: this.urlObj.port || this.defaultPort,
                path: this.urlObj.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req =  this.fn.request(options, (res) => {
                res.setEncoding('utf8');
                let aResData = [];
                res.on('data', (chunk) => {
                    aResData.push(chunk);
                });
                res.on('end', () => {
                    let resData = aResData.join("");
                    let data = resData.toString();
                    resolve(data);
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(postData);
            req.end();
        });
        return promise;
    }
    get(){
        if(this.data){
            for(let item in this.data){
                this.urlObj.query[item] = this.data[item];
            }
            delete this.urlObj.search;
            delete this.urlObj.path;
            delete this.urlObj.href;
            this.url = url.format(this.urlObj);
        }
        let promise = new Promise((resolve , reject)=>{
            this.fn.get(this.url, (res) => {
                const { statusCode } = res;
                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }
                if (error) {
                    reject(error);
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    resolve(rawData);
                });
            }).on('error', (e) => {
                reject(e)
            });
        });
        return promise;
    }
}
module.exports = httpObj;