const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
   if (req.method === 'POST') {
      console.log('ТО ЧТО НАДО!!!!!!!!')
      console.log(req.url)
   }
else{
   if(req.url === '/'){
      console.log('нормас html')
      sendRes("siteForUser","text/html", res );
   }
   else if(req.url === '/showfile.html'){
      sendRes("showfile.html","text/html", res );
   }
   else if(req.url === '/Test.txt'){
      sendRes("Test.txt","text/plain", res );
   }
   else{
      console.log('не html')
      sendRes(req.url,getContentType(req.url) , res);
   }
   }  
}).listen(3000, () =>{
   console.log('Node port 3000');
});





function sendRes( url, contentType, res ){
   let file = path.join(__dirname , 'static', url);
   fs.readFile(file,'utf8',(err, data)=>{
      if(err){
         res.writeHead(404);
         res.write('file not found');
         res.end();
         console.log(`error 404 ${file}`);
         console.log(url);
      }
      else{
         res.writeHead(200,{'Content-Type': contentType});
         res.write(data);
         res.end();
         console.log(file);
      }
    
      
   })
}

function getContentType(url){
   switch(path.extname(url)){
      case '.html':
         return "text/html";
      case '.css':
         return 'text/css';
      case '.js':
         return 'text/javascript';
      case '.json':
         return 'application/json';
      default:
         return 'application/octate-stream';
   }
}