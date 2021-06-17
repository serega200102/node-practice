
const fs = require('fs');


let writeTxt = new Promise(function(resolve, reject){
   fs.writeFile("Test.txt", "Hello мир!",function(error){
      if(error){
         throw reject();
      }else{
         resolve();
      }
      
   })
});

writeTxt.then(() => {
   fs.readFile("Test.txt", "utf8", function(error,data){ // если возникла ошибка
      if(error) throw error;
      console.log(data);
    });
    }).catch(()=>{
       console.log("Troble")
    })