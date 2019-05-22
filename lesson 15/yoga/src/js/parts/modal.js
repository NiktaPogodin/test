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