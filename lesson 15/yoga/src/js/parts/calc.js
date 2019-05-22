function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0], // Кол-во людей
        restDays = document.querySelectorAll('.counter-block-input')[1],// Кол-во дней
        place = document.getElementById('select'),                      // Базы отдыха
        totalValue = document.getElementById('total'),                  // Сумма поездки
        personsSum = 0,
        daysSum = 0,
        total = 0,
        symbol = /[\D]/ig;

    totalValue.innerHTML = 0; // Общая сумма 0

    persons.addEventListener('change', function() {
        personsSum = +this.value; // То что ввел пользователь
        total = (daysSum + personsSum)*4000;

        // Если вводят символ в поле кол-во людей, обнуляем общую сумму
        if (persons.value.match(symbol)) {
            persons.value = '';
        } else if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else if (persons.value == 0 || restDays.value == 0) {
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
            restDays.value = '';
        } else if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else if (persons.value == 0 || restDays.value == 0) {
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
}

module.exports = calc;