const http = require('http');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const {parse} = require ('querystring'); 

let obj;
let objmas = [];
let objmas2 = [];
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
                    console.log(typeof(JSON.parse(data)))
                    let a = JSON.parse(data)
                    resolve(a);
                    console.log('все ок')
                   
                 }  
              })
           });
            readtext.then((data) => {
               let index = -1;
               console.log('тут инфа из сервера')
               let info = data ;
               console.log(info)
               console.log(result)
               console.log(result.password)
               for(let i = 0; i<info.length; i++ ){
                  if(result.email == info[i].email){
                     index = i;
                  } 
               }
               result.password = crypto.createHash('md5').update(result.password).digest('hex');
              // console.log(result.password)
             if(index == -1){
                  console.log('нет такого email')
               }
               else if(result.password == info[index].password) {
                  console.log('ВЫ ЗАШЛИ!!')
                  sendRes("site.html","text/html", res );
               }
               else{
                  console.log('пароль не верный')
               }
            
             }).catch(()=>{
                console.log("Troble")
             })
            });
      }
      else{
         collectRequestData(req, result => {
               //console.log(result.password)
               result.password = crypto.createHash('md5').update(result.password).digest('hex');
               let readtext2 = new Promise(function(resolve, reject){  
                  fs.readFile("./static/Test.txt", "utf8", function(error,data){
                       if(error){
                          console.log('бедаа')
                          reject();
                       }else{
                        console.log('файл считался');
                        resolve(data)
                       }  
                    })
                 });

               readtext2.then((data) => {
                  let a = []
                  objmas = [];
                  console.log(data)
                  console.log(objmas)
                  console.log('start')
                  //console.log(JSON.parse(data))
                  a = JSON.parse(data);
                  console.log(a.length)
                  console.log(objmas)
                 // console.log(result)
                  for(let i = 0; i <= a.length-1; i++){
                     console.log('bu')
                     console.log(i)
                     objmas.push(a[i])
                     
                  }
                  console.log('info')
                  console.log(objmas)
                  //console.log(a)
                  //objmas.push(JSON.parse(data))
                  objmas.push((result))
                  //console.log(JSON.stringify(objmas))
                  fs.writeFile("./static/Test.txt", JSON.stringify(objmas), function(error){
                     if(error){
                        console.log('бедаа')
                        console.log(error)
                        
                     }else{
                        console.log('записано')
                     } 
                  })

               }).catch(()=>{
                  console.log("Trobble")
               })
               /*fs.appendFile("./static/Test.txt",JSON.stringify(result), function(error){
                  if(error){
                     console.log('бедаа')
                     console.log(error)
                     
                  }else{

                     console.log(result)
                     console.log('записано')
                  } 
               })*/
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
         //console.log(body);
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