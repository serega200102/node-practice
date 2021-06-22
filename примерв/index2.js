const http = require("http");
const fs = require('fs');
const path = require('path');

http.createServer((req,res) =>{
   console.log('server work');
   console.log(req.method);
   res.end("gooo")
   
}).listen(3000, () =>{
   console.log('Node port 3000');
});