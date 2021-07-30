btm.onclick = function() {
   //console.log(document.querySelector('#scales1'))
   if(document.getElementById('password').value != document.getElementById('password2').value){
      alert('Пароли не совпадают')
      return false;
   }
 };


