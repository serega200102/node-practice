const http = require('http');
const fs = require('fs');
const path = require('path');
const {parse} = require ('querystring'); 
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
      collectRequestData(req, result => {
         console.log(result);
         fs.writeFile("./static/Test.txt",JSON.stringify(result), function(error){
            if(error){
               console.log('бедаа')
               console.log(error)
               
            }else{
               console.log('gg')
               console.log('записано')
            } 
         })
         sendRes("showfile.html","text/html", res );
     });
  
    }
    else {
      if(req.url ==='/'){
         console.log('нормас html')
         sendRes("index.html","text/html", res );
      }
      else if(req.url === '/showfile.html'){
         sendRes("showfile.html","text/html", res );
      }
      else if(req.url === '/Test.txt?'){
         sendRes("Test.txt","text/plain", res );
         console.log('без вопроса')
      }
      else{
         console.log('не html')
         console.log(getContentType(req.url))
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
  /* switch(path.extname(url)){
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
   }*/
   const ContType = new Map([
      [".html", "text/html"],
      [".css", "text/css"],
      [".js", "text/javascript"],
      [".json", "application/json"]
    ]);
    return ContType.get(path.extname(url));
    

}


function collectRequestData(request, callback) {
   const FORM_URLENCODED = 'application/x-www-form-urlencoded';
   if(request.headers['content-type'] === FORM_URLENCODED) {
       let body = '';
       request.on('data', chunk => {
           body += chunk.toString();
       });
       request.on('end', () => {
           callback(parse(body));
       });
   }
   else {
       callback(null);
   }
}