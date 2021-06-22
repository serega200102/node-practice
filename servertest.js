const http = require("http");
const fs = require('fs');
const path = require('path');

http.createServer((req,res) =>{
   console.log(`req: ${req.url}`);
   if(req.method ==='GET'){
      if(req.url ==='/'){
         console.log('нормас html')
         sendRes("index.html","text/html", res );
      }
      else{
         console.log('плохо css или post запрос')
         sendRes(req.url,getContentType(req.url) , res)
      }
   }
   else{
      console.log('f');
      console.log(req.method);
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