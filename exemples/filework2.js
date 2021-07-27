
const fs = require('fs');

let readtext = new Promise(function(resolve, reject){  
 fs.readFile("./static/Test.txt", "utf8", function(error,data){
      if(error){
         console.log('бедаа')
         reject();
      }else{
         resolve(data);
         console.log('все ок')
      }  
   })
});

readtext.then((data) => {
   console.log(data);
   console.log(a)
    }).catch(()=>{
       console.log("Troble")
    })


 