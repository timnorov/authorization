'use strict';

let greeting = document.querySelector('.greeting'),
    registUser = document.querySelector('.registUser'),
    loginUser = document.querySelector('.loginUser'),
    userList = document.querySelector('.userList'),
    userName = '',
    login = '',
    password = '',
    newUser = {},
    regDate = '',
    date = new Date(),
    lastName = '',
    log,
    pass,
    firstName = '';

let options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

let userData = [];
  
const render = function () { 
  userList.textContent = '';
    
  userData.forEach(function(item){
        const li = document.createElement('li');
        li.setAttribute('data-key', item.id);
        li.innerHTML = 'Имя: ' + item.firstName + ', ' +
          'фамилия: ' + item.lastName + ', зарегистрирован: ' + item.regDate + '<button class="user-remove"></button>';

          userList.append(li);

          const btnUserDelete = li.querySelector('.user-remove');

          btnUserDelete.addEventListener('click', function(){
            deleteUser(li.getAttribute('data-key'));
          });     
  });
};

 registUser.addEventListener('click', function(){
      do{
      userName = prompt('Введите через пробел Имя и Фамилию пользователя');
      userName = userName.replace(/\s+/g, ' ').trim();
      if (userName.split(" ").length - 1 > 1){
        alert('Вы ввели более двух слов');
      } else if (userName.split(" ").length - 1 == 0) {
        alert('Вы ввели что-то одно. Пожалуйста, введите имя И фамилию');
      }
      } while (userName.split(" ").length - 1 !== 1);

      login = prompt('Введите логин пользователя');
      password = prompt('Введите пароль пользователя');
      firstName = userName.split(' ')[0];
      firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
      lastName = userName.split(' ')[1];
      lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();
      newUser = {
      id: Date.now(),
      regDate: date.toLocaleString("ru", options),
      firstName: firstName,
      lastName: lastName,
      login: login,
      password: password 
    };
      userData.push(newUser);
      addToLocalStorage(userData);
          
      render();
 });


function addToLocalStorage(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
  render(userData);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('userData');
  if (reference) {
    userData = JSON.parse(reference);
    render(userData);
  }
}
getFromLocalStorage();

function deleteUser(id) {
  userData = userData.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(userData);
}

 render();

 loginUser.addEventListener('click', function(){

    var usrName = prompt('Введите Логин');
    var usrPw = prompt('Введите Пароль');

    let storedUsers = JSON.parse(localStorage.getItem('userData'));
    if(storedUsers) {
        for (let i = 0; i < storedUsers.length; i++){
            if (usrName == storedUsers[i].login && usrPw == storedUsers[i].password) {
                return greeting.innerHTML = storedUsers[i].firstName;

             }
        }
    } 
    return alert('Пользователь с такими данными не найден.');
 });