/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        total = 0;
        
        totalValue.innerHTML = 0;   
        
        function checkInput(input) {
            input.addEventListener('keypress', function(evt) {
                if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            });
        }
        
        checkInput(persons);
        checkInput(restDays);
        
        function result(input) {
            input.addEventListener('change', function() {
                total = (+restDays.value + (+persons.value))*4000*place.value;
                
                if(restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });
        }

        result(persons);
        result(restDays);
        result(place);
    }
    
    module.exports = calc;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form');   
    
    function sendForm(elem) {
        let input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            
        let message = {
            loading: '<img src="../../img/loading.gif">',
            success: '<img src="../../img/success.svg">',
            failure: '<img src="../../img/failure.png">',
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
}

module.exports = form;

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
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
}

module.exports = modal;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
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
}

module.exports = slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
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
}

module.exports = timer;

/***/ }),

/***/ "./src/js/parts/valid.js":
/*!*******************************!*\
  !*** ./src/js/parts/valid.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function valid() {
    let setCursorPosition = (pos, elem) => {
        elem.focus();
    
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
    
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    
    function Mask(event) {
        let matrix = '+7(___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
    
        if (def.length >= val.length) {
            val = def;
        }
    
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
    
        if (event.type == 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }
        
    let input = document.querySelectorAll('[type="tel"]');
    
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', Mask, false);
        input[i].addEventListener('focus', Mask, false);
        input[i].addEventListener('blur', Mask, false);
    }
}

module.exports = valid;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function() {

    "use strict";
	let tab = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
        form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
        timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js"),
        modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js"),
        calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
        valid = __webpack_require__(/*! ./parts/valid.js */ "./src/js/parts/valid.js");

    tab();
    form();
    slider();
    timer();
    calc();
    modal();
    valid();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map