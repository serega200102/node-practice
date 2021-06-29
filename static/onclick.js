btm.onclick = function() {
   if(document.getElementById('password').value != document.getElementById('password2').value){
      alert('Пароли не совпадают')
      return false;
   }
 };
