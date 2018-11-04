var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express();

// post 방식으로 들어오는 값을 처리하는 녀석
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }    
        res.render('new', {topics: files});
    });
})
app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
            // id 값이 있다면
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            })
        }
        else{
            // id 값이 없다면
            res.render('view', { topics: files, title: 'Welcome', description: 'Hello, Javascript for server.'});
        }
    })
})

app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, function (err) {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
})
app.listen(3000, function (req, res) {
    console.log('Connected, 3000 port!');
})