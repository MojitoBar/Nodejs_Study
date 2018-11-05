var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express();

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'o2'
});
conn.connect();


// post 방식으로 들어오는 값을 처리하는 녀석
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/topic/add', function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics: topics});
    });
})

app.post('/topic/add', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
    conn.query(sql, [title, description, author], function(err, rows, fields){
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        else{
            res.redirect('/topic/'+rows.insertId);
        }
    });
})

app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                else{
                    res.render('view', { topics: topics, topic: topic[0] }); 
                }
            });
        }
        else{
            res.render('view', { topics: topics });             
        }
    });
})


app.listen(3000, function (req, res) {
    console.log('Connected, 3000 port!');
})