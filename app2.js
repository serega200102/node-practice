
const fs = require('fs');


let writeTxt = new Promise(function(resolve, reject){
   fs.writeFile("Test.txt", "Hello мир!",function(error){
      if(error){
         let a = 1;
      };
   })
   if(a == 1){
      console.log(",tlff");
      reject();
   }
   else{
      resolve();
   }
});

writeTxt.then(() => {
   fs.readFile("Test.txt", "utf8", function(error,data){ // если возникла ошибка
      if(error) throw error;
      console.log(data);
    });
    }).catch(()=>{
       console.log("Troble")
    })