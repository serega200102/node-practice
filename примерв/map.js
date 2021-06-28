

function getContentType(url){
const ContType = new Map([
   [".html", "text/html"],
   [".css", "text/css"],
   [".js", "text/javascript"],
   [".json", "application/json"]
 ]);
 console.log(ContType.get(url))
 return ContType.get(url);
}

let a = getContentType('.css')
console.log(a);