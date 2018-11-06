var http = require("http");
var url=require('url');
var querystring = require('querystring');
var fs=require('fs');
var path=require('path');
var hostName = '127.0.0.1';
var port = 80;

var server = http.createServer(function(req,res) {
    var arg = url.parse(req.url).pathname;
    var filepath = path.resolve('../json/'+arg);
    fs.readFile(filepath,'utf-8',function(err,data){
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8;',"Access-Control-Allow-Origin":"*"});
        // res.write(data);
        res.end("成功");
    });
    // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8;'});
    //     res.write(filepath);
});

server.listen(port,hostName, function(){
    console.log('the service is running'+port);
});



