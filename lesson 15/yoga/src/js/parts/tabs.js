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