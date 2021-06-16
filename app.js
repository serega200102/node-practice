
const fs = require('fs');



let writeTxt = new Promise(function(resolve, reject){
   fs.writeFile("Test.txt", "Hello мир!",function(error){})
   resolve();
   console.log("Асинхронная запись файла завершена. Содержимое файла:");
});

writeTxt.then(() =>{
   fs.readFile("Test.txt", "utf8", function(error,data){ // если возникла ошибка
      console.log(data);
    });

});