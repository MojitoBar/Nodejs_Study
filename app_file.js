var express = require('express');

var app = express();

// 정적인 파일이 위치할 디렉토리 정하기
app.use(express.static('public'));

// get = 일종의 라우팅 설정
app.get('/', function(req, res){
    res.send('Hello home page');
});
app.get('/login', function(req, res){
    res.send('Please Login');
})
app.get('/route', function(req, res){
    res.send('Hello route, <img src="/route.png">')
})
app.get('/dynamic', function(req, res){
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "utf-8">
        </head>
        <body>
            Hello, Dynamic!
        </body>
    </html>
    `;
    res.send(output)
})
app.listen(3000, function(){
    console.log('Connected 3000 port!');
});