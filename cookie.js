const http = require('http')
const Cookies = require('cookies')

http.createServer(function(req,res){

   let cookies = new Cookies(req,res);
  
   if(req.url == '/favicon.ico'){
      res.end();
      return;
   }
  cookies.set('admin', 'true');
  console.log(req.headers.cookie);
  console.log(cookies.get('admin'));
   if (req.headers.cookie.includes('admin') && req.headers.cookie.includes('true')){
      console.log('good')
   }else{
      console.log('bad')
   }
  res.end();



}).listen(3000, function(){
   console.log('server on 3000 port')
})