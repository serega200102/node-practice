const http = require('http');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const {parse} = require ('querystring'); 

let obj;
const server = http.createServer((req, res) => {
   if (req.method === 'POST') {

      if(req.url == '/log.html'){
         collectRequestData(req, result => {
            
            
         let readtext = new Promise(function(resolve, reject){  
            fs.readFile("./static/Test.txt", "utf8", function(error,data){
                 if(error){
                    console.log('бедаа')
                    reject();
                 }else{
                     obj = JSON.parse(data);
                    resolve(obj);
                    console.log('все ок')
                 }  
              })
           });
            readtext.then((data) => {
               console.log('тут инфа из сервера')
               let a = data ;
               console.log(a)
               console.log(result)
               console.log(result.password)
               result.password = crypto.createHash('md5').update(result.password).digest('hex');
               console.log(result.password)
             if(result.email == data.email && result.password == data.password){
                console.log('зашел')
              }else{
                  console.log('не зашел')
                  console.log(result.email)
                  console.log(data.email)
                  console.log(result.password)
                  console.log(data.password)
            }
            
             }).catch(()=>{
                console.log("Troble")
             })
            });
      }
      else{
         /*var hash = crypto.createHash('md5').update(req).digest('hex');
         console.log(hash);*/
         collectRequestData(req, result => {
               console.log(result.password)
               result.password = crypto.createHash('md5').update(result.password).digest('hex');

               console.log(typeof(result))
               console.log(result.password)
               fs.writeFile("./static/Test.txt",JSON.stringify(result), function(error){
                  if(error){
                     console.log('бедаа')
                     console.log(error)
                     
                  }else{

                     console.log(result)
                     console.log('записано')
                  } 
               })
               sendRes("reg.html","text/html", res );
        });
      }
      
  
    }
    else {
      getform(req,res);
    }


}).listen(3000, () =>{
   console.log('Node port 3000');
});




function collectRequestData(request, callback) {
   const FORM_URLENCODED = 'application/x-www-form-urlencoded';
   if(request.headers['content-type'] === FORM_URLENCODED) {
       let body = '';
       request.on('data', chunk => {

           body += chunk.toString();
         console.log(body);
       });
       request.on('end', () => {
           callback(parse(body));
       });
   }
   else {
       callback(null);
   }
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
function getform(req,res){
   if(req.url ==='/'){
      sendRes("reg.html","text/html", res );
   }
   else if(req.url === '/log.html?'){
      sendRes("log.html","text/html", res );
   }
   else if(req.url === '/reg2.html?'){
      sendRes("reg2.html","text/html", res );
   }
   else{
      console.log('не html')
      console.log(getContentType(req.url))
      sendRes(req.url,getContentType(req.url) , res);
   }
}

function readTxt(){
   let info = fs.readFile("./static/Test.txt", "utf8", function(error,data){ // если возникла ошибка
      if(error) throw error;
      return data
    });  
}