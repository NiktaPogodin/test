window.addEventListener('DOMContentLoaded', function() { // Назначение обработчика событий

    'use strict'; // Перевод в строгий режим
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    /*    Функция скрывающая табы    */

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1); // Скрываются все tabContent, кроме первого

    /*    Функция показывающая таб    */

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) { // Проверяет действительно ли элемент скрыт
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    /*    Обрабатывает событие, при клике на каждый из табов    */

    info.addEventListener('click', (event) => {
        let target = event.target; 
        if (target && target.classList.contains('info-header-tab')) { // Сравнивает с тем куда кликаем
            for(let i = 0; tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0); // Скрываем все табы
                    showTabContent(i); // Показывается тот элеметн на который кликныли
                    break; // Останавливаем цикл
                }
            }
        }
    });

    // Timer

    let deadLine = '2018-05-08',
        now = Date.parse(new Date()), // Дата на компьютере
        over = Date.parse(deadLine); // Дата конца

    if (over <= now) {
        let timer = document.getElementById('timer'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
    } else {
        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()), // Разница между датами (кол-во миллисекунд)
                seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/(1000*60*60)));
                // hours = Math.floor((t/1000/60/60) % 24),
                // days = Math.floor((t/(1000*60*60*24)));

            return {
                'total' : t, // Кол-во миллисекунд
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }
    
        function setClock (id, endTime) {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000); // Обновление таймера каждую секунду
    
            /*    Динамическая запись данные в верстку    */
    
            function updateClock() {
                let t = getTimeRemaining(endTime);
                hours.textContent = appendZero(t.hours);
                minutes.textContent = appendZero(t.minutes);
                seconds.textContent = appendZero(t.seconds);
    
                if(t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }

        function appendZero(i) {
            if (i < 10){	
                i = "0" + i;
            }
            return i;
        }

        setClock('timer', deadLine);

        
    }

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', () => {
        overlay.style.display = 'block';            // При клике форма становится видимой 
        more.classList.add('more-splash');          // Анимация
        document.body.style.overflow = 'hidden';    // Запрещает прокрутку страницы
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';             // При клике на крестик форма становится невидимой
        more.classList.remove('more-splash');       // Убирает анимацию с кнопки "Узнать больше"
        document.body.style.overflow = '';
    });
    
    // Modal[0]

    let btn = document.getElementsByClassName('description-btn')[0],
		information = document.getElementsByClassName('info')[0],
        descriptionBtn = document.getElementsByClassName('description-btn');
        
    information.addEventListener('click', (event) => {
        let target = event.target;  // Получаем исходный(конкретный) элемент на котором произошло событие

        if (target.className == 'description-btn') {    // Проверка на нужные кнопки
            let overlay = document.querySelector('.overlay'),
                close = document.querySelector('.popup-close');
            
            overlay.style.display = 'block';            // При клике форма становится видимой 
            more.classList.add('more-splash');          // Анимация
            document.body.style.overflow = 'hidden';    // Запрещает прокрутку страницы
    
            close.addEventListener('click', () => {
                overlay.style.display = 'none';         // При клике на крестик форма становится невидимой
                more.classList.remove('more-splash');   // Убирает анимацию с кнопки
                document.body.style.overflow = '';
			});
	    }
    });

    // Form
    // let imgLoader = document.createElement('img');
    // imgLoader.src = "img/loading.gif";
    // let imgSuccess = document.createElement('img');
    // imgSuccess.src = "img/succcess.png";
    // let imgFailure = document.createElement('img');
    // imgFailure.src = "img/failure.png";

    // let message = new Object();
    // message.loading = document.createElement('div');
    // message.loading.appendChild(imgLoader);
    // message.failure = document.createElement('div');
    // message.failure.appendChild(imgFailure);
    // message.success = document.createElement('div');
    // message.success.appendChild(imgSuccess);

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так!',
    };
  
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        // statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);
            
            let request =  new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader("Content-Type","application/json; charset=utf-8");

            let formData = new FormData(form);

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                    // form.appendChild(message.loading);
                } else if (request.readyState === 4 && request.status === 200) {
                    if (request.status < 300) {
                        statusMessage.innerHTML = message.success;
                        // form.appendChild(message.success);
                    } else {
                        statusMessage.innerHTML = message.failure;
                        // form.appendChild(message.failure);
                    }
                }
            });
                
            /*  Очищяем поля ввода  */

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
    });  
});

