const http = require('http');
const fs = require('fs');
const path = require('path');
var crypto = require('crypto');
let Cookies = require('cookies');
const {parse} = require ('querystring'); 
const parsee = require('node-html-parser').parse;
const { json } = require('body-parser');
let name = 'Yes';
var hashkey = crypto.createHash('md5').update(name).digest('hex');
let objmas = [];
let useridd;
let time;
let Appointments = [];
let AppointmentsUser = [];
let Appointment = [];
CountId = 1;
let readtext = new Promise(function(resolve, reject){  
   fs.readFile("./static/Test.txt", "utf8", function(error,data){
        if(error){
           console.log('бедаа')
           reject();
        }else{
         fs.readFile("./static/text.txt", "utf8", function(errorr,dataA){
            if(errorr){
               console.log('бедаа')
               
            }else{
               Appointment.push(dataA)
               console.log('Скопировали данные записей перед запуском сервера')
               resolve(data);
            }  
         })
           
           console.log('Скопировали данные перед запуском сервера')
        }  
     })
  });
  
  readtext.then((data) => {
     //console.log(Appointment)
     console.log('Буратино')
     Appointment = JSON.parse(Appointment[0])
     console.log(Appointment)
     console.log(typeof(Appointment))
     objmas.push(data);
     objmas = JSON.parse(objmas)
     console.log('Информация загружена и обработана в json')

     const server = http.createServer((req, res) => {
   
      let cookies = new Cookies(req, res);


      if (req.method === 'POST') {
         
         if(req.url == '/siteForAdmin.html'){
            collectRequestData(req, result => {
               console.log('BUUUUUUUUUUUUUUUUM')
               console.log(result)
               Appointments = Appointment;
               //Appointments = JSON.parse(Appointments)
               console.log(Appointments)
               for(i=0;i<Appointments.length;i++){
                  if(Appointments[i].Doctor == result.emailDoc && Appointments[i].user == result.email && Appointments[i].time == result.time){
                     console.log('deliiite')
                     Appointments.splice(i,1)
                  }
               } 
               fs.writeFile("./static/text.txt", JSON.stringify(Appointments), function(error){
                  if(error){
                     console.log('бедаа')
                     console.log(error)
                     
                  }else{
                     console.log('записано')
                  } 
               })
            });
         }
         if(req.url == '/siteForUser.html'){
            collectRequestData(req, result => {
               for(i=0;i<objmas.length;i++){
                  if(req.headers.cookie.includes(objmas[i].password2)){
                     result.user=objmas[i].email
                  }
               }
               Appointments=Appointment
               Appointments.push(result)
               console.log('запушили')
               
               //console.log(Appointments)
               fs.writeFile("./static/text.txt", JSON.stringify(Appointments), function(error){
                  if(error){
                     console.log('бедаа')
                     console.log(error)
                     
                  }else{
                     console.log('записано')
                  } 
               })
               console.log('Проверкааа')
               Appointment = Appointments
               console.log(JSON.stringify(Appointment))
            });
         }
         else if(req.url == '/site.html'){
            objmas[index].Timecode = `${new Date().toISOString()}`   //Нужно, чтобы обновлять последнюю активность пользователя
            let UsCode = cookies.get('usercode');
            let numberOfPerson;
            collectRequestData(req, result => {
            
            console.log(objmas)
            for(i=0;i<objmas.length;i++){
               if(UsCode ==  objmas[i].password2){
                  objmas[i].Name= `${result.Name}`
                  objmas[i].Age= `${result.age}`
               }   
            } 

            });

         }
         else if(req.url == '/log.html'){

            
            collectRequestData(req, result => {
            let index = -1;                     // переменная для проверки наличия email в базе данных

            for(let i = 0; i<objmas.length; i++ ){
               if(result.email == objmas[i].email){
                  index = i;
                  } 
               }
               result.password = crypto.createHash('md5').update(result.password).digest('hex');

               if(index == -1){
                  console.log('нет такого email')
               }
               else if(result.password == objmas[index].password) {
                  console.log('ВЫ ЗАШЛИ!!')
                  objmas[index].Timecode = `${new Date().toISOString()}`

                  cookies.set('TimeUserCode',`${new Date().toISOString()}`)

                  cookies.set('usercode', `${objmas[index].password2}`,{maxAge: 2 * 60 * 60 * 1000 * 24})
                  cookies.set('userkey',`${hashkey}`,{maxAge: 2 * 60 * 60 * 1000 * 24})

                  if(objmas[index].TypeOfUser == 1){
                  res.writeHead(302, {"Location": "siteForUser.html"});
                  res.end();
                  }
                  else if(objmas[index].TypeOfUser == 2){
                     res.writeHead(302, {"Location": "siteForAdmin.html"});
                     res.end();
                  }
                  else if(objmas[index].TypeOfUser == 3){
                     res.writeHead(302, {"Location": "siteForDoctor.html"});
                     res.end();
                  }
               }
               else{
                  console.log('пароль не верный')
               }  
            });
         }
         else if(req.url == '/'){               //возможно ьудет ошибка с url(заменить на reg.html)
            collectRequestData(req, result => {
                     for(i=0;i<objmas.length-1;i++){
                        CountId = objmas[i].id + 1
                        console.log('странный вывод')
                        console.log(CountId)
                     }
                     result.password = crypto.createHash('md5').update(result.password).digest('hex');
                     result.password2 = Math.random()*(100-1+1)+1;
                     result.id = CountId;
                     //CountId += 1;
                     console.log('Записываем данные нового клиента')

                     objmas.push(result)

                     fs.writeFile("./static/Test.txt", JSON.stringify(objmas), function(error){
                        if(error){
                           console.log('бедаа')
                           console.log(error)
                           
                        }else{
                           console.log('записано')
                        } 
                     })
                  
                  sendRes("reg.html","text/html", res, req );
           });
         }
         
     
       }
       else {
         // if(req.url == '/siteForDoctor.html'){

        // }
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
   
   
    function sendRes( url, contentType, res, req ){     //ФУНКЦИЯ ДЛЯ ПЕРЕХОДА НА НОВЫЙ get ЗАПРОС
      console.log(url)
      if(url == '/siteForUser.html' || url == '/siteForAdmin.html'||url == '/siteForDoctor.html'){  
      if(url == '/siteForDoctor.html') {
         console.log('ДОктор заходит')
         //Appointment = JSON.stringify(Appointment)
         console.log(Appointment)
         console.log(typeof(Appointment))
         time = new Date();
         
         for(i=0; i <objmas.length ; i++ ){
            if (req.headers.cookie.includes(`${objmas[i].password2}`)){
               console.log('нашееел')
               useridd = i;
            }else{
               console.log('не нашел')
            }
           
         }
         let Timecheck = Date.parse(objmas[useridd].Timecode) - Date.parse(time)
        if(Timecheck < 172800000){
           
         let file = path.join(__dirname , 'static', url);
         if(req.headers.cookie.includes('userkey') && req.headers.cookie.includes(`${hashkey}`) && 
            req.headers.cookie.includes(`usercode`)&&req.headers.cookie.includes(`${objmas[useridd].password2}`)){
            fs.readFile(file,'utf8',(err, data)=>{
               if(err){
                  res.writeHead(404);
                  res.write('file not found');
                  res.end();
                  console.log(`error 404 ${file}`);
                  console.log(url);  
               }
               else{
                  let yourAppoint=[];
                  console.log('Тип тут')
                  console.log(Appointment)
                  Appointments = Appointment
                  console.log(Appointment)
                  console.log(Appointments)
                  for(i=0;i<Appointments.length;i++){
                     //console.log(Appointment[i].Doctor)
                     if(Appointments[i].Doctor == objmas[useridd].email){
                        yourAppoint.push(Appointments[i])
                     }
                  }
                  data = data.replace(/\{\{Recordings\}\}/,`<p>Список записей: ${JSON.stringify(yourAppoint)} </p>`)
                  //console.log(doctors);
                  res.writeHead(200,{'Content-Type': contentType});
                  res.write(data);
                  res.end();
                  
            }
         })
         }else{
            console.log('не прошло')
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
            console.log(url);
         }
        }
      }
      if(url == '/siteForAdmin.html'){
         time = new Date();
         
         for(i=0; i <objmas.length ; i++ ){
            if (req.headers.cookie.includes(`${objmas[i].password2}`)){
               console.log('нашееел')
               useridd = i;
            }else{
               console.log('не нашел')
            }
           
         }
         let Timecheck = Date.parse(objmas[useridd].Timecode) - Date.parse(time)
        if(Timecheck < 172800000){
           
         let file = path.join(__dirname , 'static', url);
         if(req.headers.cookie.includes('userkey') && req.headers.cookie.includes(`${hashkey}`) && 
            req.headers.cookie.includes(`usercode`)&&req.headers.cookie.includes(`${objmas[useridd].password2}`)){
            fs.readFile(file,'utf8',(err, data)=>{
               if(err){
                  res.writeHead(404);
                  res.write('file not found');
                  res.end();
                  console.log(`error 404 ${file}`);
                  console.log(url);  
               }
               else{
                  let Appointmentss = JSON.stringify(Appointment)
                  data = data.replace(/\{\{Recordings\}\}/,`<p>Список записей: ${Appointmentss} </p>`)
                  //console.log(doctors);
                  res.writeHead(200,{'Content-Type': contentType});
                  res.write(data);
                  res.end();
                  
            }
         })
         }else{
            console.log('не прошло')
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
            console.log(url);
         }
        }
      }
      if(url == '/siteForUser.html'){
         console.log('TIMEEEE')
         time = new Date();
         
         for(i=0; i <objmas.length ; i++ ){
            if (req.headers.cookie.includes(`${objmas[i].password2}`)){
               console.log('нашееел')
               useridd = i;
            }else{
               console.log('не нашел')
            }
           
         }
         console.log('цикл конец')
        let Timecheck = Date.parse(objmas[useridd].Timecode) - Date.parse(time)
        if(Timecheck < 172800000){
           
         let file = path.join(__dirname , 'static', url);
         if(req.headers.cookie.includes('userkey') && req.headers.cookie.includes(`${hashkey}`) && 
            req.headers.cookie.includes(`usercode`)&&req.headers.cookie.includes(`${objmas[useridd].password2}`)){
            fs.readFile(file,'utf8',(err, data)=>{
               if(err){
                  res.writeHead(404);
                  res.write('file not found');
                  res.end();
                  console.log(`error 404 ${file}`);
                  console.log(url);  
               }
               else{
                  /*const root = parsee(data);
                  const bodyy = root.querySelector('body');
                  //console.log(bodyy)
                  data.replace("</body>",'<div id = "asdf">buuu</div></body>');
                  //root.appendChild('<h1>Добро Пожаловать, Доктор)</h1>');
                  console.log('TUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUT');
                  //console.log(root.toString());*/
                  let doctors = []
                  for(i=0;i<objmas.length;i++){
                     if(objmas[i].TypeOfUser == 3){
                        doctors.push(objmas[i].email)
                       // console.log('есть')
                     } 
                  }
                  data = data.replace(/\{\{Doctors\}\}/,`<p>Список докторов: ${doctors} </p>`)
                  console.log(doctors);
                  res.writeHead(200,{'Content-Type': contentType});
                  res.write(data);
                  res.end();
                  
            }
         })
         }else{
            console.log('не прошло')
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
            console.log(url);
         }
        }
         
      } 
      }else{
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
               console.log(`запуск файла ${url}`);
            }
         })
      }
   }
   function getform(req,res){    //ФУНКЦИЯ ДЛЯ ЛОГИКИ ПЕРЕХОДОВ МЕЖДУ СТРАНИЦАМИ

      if(req.url === '/'){
         sendRes("reg.html","text/html", res, req );
      }
      else if(req.url === '/log.html?'){
         sendRes("log.html","text/html", res, req );
      }
      else if(req.url === '/site.html'){
         sendRes("site.html","text/html", res, req );
      }
      else{
         console.log('не html')
         console.log(getContentType(req.url))
         sendRes(req.url,getContentType(req.url) , res, req);
      }
   }

      }).catch(()=>{
         console.log("Trouble")
      })
  

