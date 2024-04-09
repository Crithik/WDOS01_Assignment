const Popup = document.getElementById('show-popup');
const Container = document.getElementById('popup-container');
const popupClose = document.getElementById('close-popup');
const save = document.getElementById('save');
// const login = document.getElementById('login');
const Log = document.getElementById('logout');

const check =JSON.parse(localStorage.getItem("Check"));
// for the popup
if (check == "admin") {
  Popup.classList.add('show')
  Log.classList.add('show')
}
else {
  Popup.classList.remove('show')
  Log.classList.remove('show')
}
  
Popup.addEventListener("click" , open );
  popupClose.addEventListener("click" , close );

  
  function open (){
      Container.classList.add('show');
  }
  
  function close (){
      Container.classList.remove('show');
  }

  save.addEventListener("click", save_detaials);

  function save_detaials(){
    const select = document.querySelector('select').value;
    const intText = document.getElementById('inputText').value;
    document.getElementById(select).innerHTML = intText;
    alert(`${select} has been changed to ${intText} sucessfully`)
}

Log.addEventListener("click", remover_user);

function remover_user () {
  localStorage.removeItem("Check");
  location.reload();
  Log.classList.remove('show')
}
