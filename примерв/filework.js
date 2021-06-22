
const fs = require('fs');


let writeTxt = new Promise(function(resolve, reject){
   fs.writeFile("Z:/Users/nofelet/Desktop/node-practice/Test.txt", "Hello мир!",function(error){
      if(error){
         console.log('бедаа')
         reject();
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