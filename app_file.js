var express = require('express');
var app = express();

// 뷰 엔진(템플릿)인 jade를 추가하겠다.
app.set('view engine', 'jade');

// 디폴트값이 views  
app.set('views', './views')

// 정적인 파일이 위치할 디렉토리 정하기
app.use(express.static('public'));

// get = 일종의 라우팅 설정
app.get('/', function(req, res){
    res.send('Hello home page');
});
app.get('/template', function(req, res){
    // render = views 안에 있는 temp 라는 jade 파일을 보여주겠다.
    res.render('temp', {time: 'hello', _title: 'Jade'});
})
app.get('/login', function(req, res){
    res.send('Please Login');
})
app.get('/route', function(req, res){
    res.send('Hello route, <img src="/route.png">')
})
app.get('/dynamic', function(req, res){
    var lis = '';
    for(var i=0; i<5; i++){
        lis = lis + '<li>coding</li>';
    }
    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset = "utf-8">
        </head>
        <body>
            Hello, Dynamic!
            ${lis}
        </body>
    </html>
    `;
    res.send(output)
})
app.listen(3000, function(){
    console.log('Connected 3000 port!');
});