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