let menu = document.querySelector('.menu'),
    columns = document.querySelectorAll('.column'),
    menuItems = document.querySelectorAll('.menu-item'),
    menuItem = document.createElement('li'),
    title = document.getElementById('title'),
    adv = document.querySelector('.adv'),
    insertAnswer = document.getElementById('prompt'),
    question = prompt('Как вы относитесь к технике apple ?', '');

menu.appendChild(menuItem); //Добавляем в li
menuItem.classList.add('menu-item'); // Добавляем class
menuItem.textContent = 'Пятый пункт'; // Присваиваем текст li
menu.removeChild(menuItems[2]); // Удаляем 3-й пункт
menu.insertBefore(menuItems[2], menuItems[1]); // Вставляем 3-й перед 2-м

document.body.style.background = 'url(img/apple_true.jpg) center no-repeat'; // Меняем фон

title.textContent = 'Мы продаем только подлинную технику Apple'; // Переименовываем

columns[1].removeChild(adv); // Удаляем рекламу

insertAnswer.innerHTML = question; // Ответ на вопрос вставляем в блок с id "prompt" 