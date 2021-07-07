const fs = require('fs');

/*let readtext = new Promise(function(resolve, reject){  
 fs.readFile("./static/Test.txt", "utf8", function(error,data){
      if(error){
         console.log('бедаа')
         reject();
      }else{
         let objs = []
         let sp = data.replace(/"/g,"")
         sp = sp.replace(/{/g,"")
         sp = sp.replace(/}/g,"")
         let splitted = sp.split("/n");
         
         
         for( let i = 0; i < splitted.length-1; i++){
            let splitLine = splitted[i].split(",");
            let obj = {}
            for(j=0; j<splitLine.length-1; j++){
               let splitelem = splitLine[j].split(':');
               obj[splitelem[0]] = splitelem[1].trim();
               objs.push(obj)    
            }
         } 
        resolve(objs)
      }  
   })
});

readtext.then((data) => {


    }).catch(()=>{
       console.log("Troble")
    })*/


    let readtext = new Promise(function(resolve, reject){  
      fs.readFile("./static/Test.txt", "utf8", function(error,data){
           if(error){
              console.log('бедаа')
              reject();
           }else{
            console.log(data);
             resolve(data)
           }  
        })
     });
     
     readtext.then((data) => {
      console.log(JSON.parse(data))
     let a =JSON.parse(data);
     console.log(a.email)
         }).catch(()=>{
            console.log("Troble")
         })

         /*{"email":"filippov.nikolay@gmail.com","password":"76d80224611fc919a5d54f0ff9fba446","password2":"qwe"},{"email":"nph@rambler.ru","password":"76d80224611fc919a5d54f0ff9fba446","password2":"qwe"},{"email":"nph@rambler.ru","password":"76d80224611fc919a5d54f0ff9fba446","password2":"qwe"},{"email":"123@13","password":"698d51a19d8a121ce581499d7b701668","password2":"111"},{"email":"123@13","password":"698d51a19d8a121ce581499d7b701668","password2":"111"},{"email":"123@13","password":"698d51a19d8a121ce581499d7b701668","password2":"111"}    {"email":"abc@gmail.com", "password":"pass"},{"email":"abc@gmail.com", "password":"pass"}
         
         ["{\"email\":\"nph@rambler.ru\",\"password\":\"202cb962ac59075b964b07152d234b70\",\"password2\":\"123\"}"]
         
         */