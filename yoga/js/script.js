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
  
    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form');   
        
    function sendForm(elem) {
        let input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            
        let message = {
            loading: '<img src="src/img/loading.gif">',
            success: '<img src="src/img/success.svg">',
            failure: '<img src="src/img/failure.png">',
        };

        elem.addEventListener('submit', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData() {
                    return new Promise(function(resolve,reject) {
                        let request =  new XMLHttpRequest();
                        request.open('POST', 'server.php');                      
                        request.setRequestHeader("Content-Type","application/json; charset=utf-8");

                        request.addEventListener('readystatechange', ()=> {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4 && request.status === 200) {
                                resolve()
                            } else {
                                reject()
                            }
                        });

                        request.send(formData);
                    });
                } // End postData

                /*  Очищяем поля ввода  */

                function clearInterval() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(()=> statusMessage.innerHTML = message.loading)
                    .then(()=> statusMessage.innerHTML = message.success)
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInterval);
        });
    }
    
    sendForm(form);
    sendForm(contactForm);

    // Slider

    let slideIndex = 1,                                     // Слайд, который показывается в текущий момент
        slides = document.querySelectorAll('.slider-item'), // Слайды
        prev = document.querySelector('.prev'),             // Стрелка навигации назад
        next = document.querySelector('.next'),             // Стрелка навигации вперед
        dotsWrap = document.querySelector('.slider-dots'),  // Оберка всех точек
        dots = document.querySelectorAll('.dot');           // Все точки

    showSlides(slideIndex);

    /*    ф-я показа слайдов    */

    function showSlides(n) {
        // Если №слайда больше ко-ва слайдов, возвращяемся к 1-му
        if (n > slides.length) {
            slideIndex = 1;
        }
        // Если №слайда меньше ко-ва слайдов, возвращяемся к последнему
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); // Скрываем все слайды

        dots.forEach((item) => item.classList.remove('dot-active')); // Со всех точек убираем class active

        slides[slideIndex - 1]. style.display = 'block'; // Тот слайд, который хотим показать 
        dots[slideIndex - 1].classList.add('dot-active'); // Точка, которую хотим показаться
    }
    // Ф-я увеличивающая параметр slideIndex 
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    // Определяет текущий слайд, и устанавливает его
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    // Шаг назад
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    // Следующий слайд
    next.addEventListener('click', function() {
        plusSlides(1);
    });
    // Переход между слайдерами, при нажатии на точки
    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0], // Кол-во людей
        restDays = document.querySelectorAll('.counter-block-input')[1],// Кол-во дней
        place = document.getElementById('select'),                      // Базы отдыха
        totalValue = document.getElementById('total'),                  // Сумма поездки
        personsSum = 0,
        daysSum = 0,
        total = 0,
        symbol = /[e\,\+\.]/ig;

        totalValue.innerHTML = 0; // Общая сумма 0

        persons.addEventListener('change', function() {
            personsSum = +this.value; // То что ввел пользователь
            total = (daysSum + personsSum)*4000;

            // Если вводят символ в поле кол-во людей, обнуляем общую сумму
            if (persons.value.match(symbol)) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            // Если вводят символ в поле на сколько дней, обнуляем общую сумму
            if (restDays.value.match(symbol)) {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value.match(symbol) || persons.value.match(symbol)) {
                totalValue.innerHTML = 0;
            } else { // число * зн-е options
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
});