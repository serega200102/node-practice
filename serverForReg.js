const http = require('http');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
const {parse} = require ('querystring'); 

let obj;
let objmas = [];
let objmas2 = [];
let readtext = new Promise(function(resolve, reject){  
   fs.readFile("./static/Test.txt", "utf8", function(error,data){
        if(error){
           console.log('бедаа')
           reject();
        }else{
           resolve(data);
           console.log('Скопировали данные перед запуском сервера')
        }  
     })
  });
  
  readtext.then((data) => {
     objmas.push(data);
     objmas = JSON.parse(objmas)
     console.log('Информация загружена и обработана в json')
      }).catch(()=>{
         console.log("Troble")
      })
  
const server = http.createServer((req, res) => {
   



   if (req.method === 'POST') {

      if(req.url == '/log.html'){
         collectRequestData(req, result => {
         let index = -1;
         console.log('тут инфа из сервера')
         console.log(objmas)
         console.log(result)
         console.log(result.password)
         for(let i = 0; i<objmas.length; i++ ){
            if(result.email == objmas[i].email){
               index = i;
               } 
            }
            result.password = crypto.createHash('md5').update(result.password).digest('hex');
              // console.log(result.password)
            if(index == -1){
               console.log('нет такого email')
            }
            else if(result.password == objmas[index].password) {
               console.log('ВЫ ЗАШЛИ!!')
               sendRes("site.html","text/html", res );
            }
            else{
               console.log('пароль не верный')
            }  
         });
      }
      else{
         collectRequestData(req, result => {
               //console.log(result.password)
                  result.password = crypto.createHash('md5').update(result.password).digest('hex');
                  let a = []
                  console.log('Записываем данные нового клиента')
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


function getContentType(url){ //Функция для получения нужного типа данных для разных файлов
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


 function sendRes( url, contentType, res ){     //ФУНКЦИЯ ДЛЯ ПЕРЕХОДА НА НОВЫЙ get ЗАПРОС
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
function getform(req,res){    //ФУНКЦИЯ ДЛЯ ЛОГИКИ ПЕРЕХОДОВ МЕЖДУ СТРАНИЦАМИ
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
