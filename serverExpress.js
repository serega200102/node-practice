const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.get('/about', function(req, res){
   res.render('about');
});
app.post('/about', urlencodedParser, function(req, res){
   let info = req.body;
   console.log(info);
   fs.appendFile('info.txt',JSON.stringify(info)   , function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
   res.render('about');
  
});
app.get('/', function(req, res){
   res.sendFile( __dirname + "/publick/news.html");
});
//post для формы 
/*app.get('/', function(req, res){
   res.sendFile( __dirname + "/publick/index.html");
});

app.get('/news', function(req, res){
   res.sendFile( __dirname + "/publick/news.html");;
});

app.get('/newi/:id', function(req, res){
   res.render("newi", {newsId: req.params.id});
});*/
app.listen(3000);