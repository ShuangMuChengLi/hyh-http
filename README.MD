对html5的storage进行了封装，使得存储时可以存储对象，读取时也返回对象。

The storage of html5 is encapsulated so that objects can be set and objects returned when get.

#安装
```bash
npm html5-http
```
#初始化
```bash
new httpUtil(url,arg).
```
其中arg为请求参数，可选。
#使用
##get请求

```bash
let httpUtil = require("html5-http");
let arg = {
    id:
        "4942cdf7-c488-4639-904c-5c38f2960007"
};
new httpUtil("http://localhost:3000?menu=index",arg).get().then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});
```
其中arg为请求参数，可选。作为?menu=index的补充。
##post请求

```bash
let arg = {
    content:"<p>OBS</p>",
    id:"f5da872c-6aa2-4e96-ae1a-ecfff7192531",
    title:"记事"
};
new index("http://localhost:3000",arg ).post().then((data) => {
    console.log(data);
    done();
}, (err) => {
    console.log(err);
    done();
});
```