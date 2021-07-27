const http = require('http')
const Cookies = require('cookies')
var crypto = require('crypto');
http.createServer(function(req,res){

   let cookies = new Cookies(req,res);
  
   if(req.url == '/favicon.ico'){
      res.end();
      return;
   }
 
  var name = 'yes';
  var hash = crypto.createHash('md5').update(name).digest('hex');
 //  console.log(hash);
 
   cookies.set( '1',`${hash}`,{maxAge: 2 * 60 * 60 * 1000 * 24});
   cookies.set('LastVisit',`${new Date().toISOString()}`)
   console.log(cookies.get('LastVisit'));
 
  // let hashkey= hash;
  // if (req.headers.cookie.includes('User') && req.headers.cookie.includes(`${hashkey}`)){
 //     console.log('good')
  // }else{
  //    console.log('bad')
  // }
  res.end();



}).listen(3000, function(){
   console.log('server on 3000 port')
})