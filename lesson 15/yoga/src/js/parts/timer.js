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