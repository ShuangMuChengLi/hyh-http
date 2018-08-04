const assert = require("chai").assert;

describe("index", function () {
    it("post", function (done) {
        const index = require("../index");
        let arg = {
            content:
                "<p>OBS</p>",
            date:
                "2018-08-02 10:11:07.790",
            del:
                "0",
            description:
                "记事",
            id:
                "f5da872c-6aa2-4e96-ae1a-ecfff7192531",
            isindex:
                "0",
            keyword:
                "记事",
            menu:
                "diary",
            title:
                "记事"
        };
        new index("http://localhost:3000",arg ).post().then((data) => {
            console.log(data);
            done();
        }, (err) => {
            console.log(err);
            done();
        });
    });
    it("get", function (done) {
        const index = require("../index");
        let arg = {
            id:
                "4942cdf7-c488-4639-904c-5c38f2960007"
        };
        new index("http://localhost:3000?menu=index",arg).get().then((data) => {
            console.log(data);
            done();
        }, (err) => {
            console.log(err);
            done();
        });
    });
});
