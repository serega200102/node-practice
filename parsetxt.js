const fs = require('fs');

let readtext = new Promise(function(resolve, reject){  
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
    })


 