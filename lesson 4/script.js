let money, time, items;

function start() {
    money =+prompt("Ваш бюджет на месяц?", '');
    time = prompt("Введите дату в формате YYYY-MM-DD", '');

    while(isNaN(money) || money == '' || money == null) {
        money =+prompt("Ваш бюджет на месяц?", '');
    }
}
start();


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
                b = prompt("Во сколько обойдется?", '');
        
            if ( (typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null
                && a != '' && b != '' && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
            } else {
                    i--;
            }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed(); // toFixed(1) Возвращяет строковое значение. Округляет до 1 ц. после запятой.
        alert("Ежедневный бюджет: " + appData.moneyPerDay);    
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка")
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
            
            appData.monthIncome = save/100/12*percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let answer = prompt("Статья необязательных расходов?", '');
            appData.optionalExpenses[i] = answer;
        }
    },
    chooseIncome: function() {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", ''),
            items2 = prompt("Может что-то еще?");

        for (let i = 0; i < 1; i++) {
            if ((typeof(items))=== 'string' && (typeof(items2))=== 'string' && items != '' 
                && items2 != '' && (typeof(items)) != null && (typeof(items2)) != null) {
                appData.income = items.split(', ');
                appData.income.push(items2);
                appData.income.sort();
                appData.income.forEach(function(item, i) {
                    alert("Способы доп. заработка: " + (i + 1) + ": " + item);
                }); 
            } else {
                alert("Проверь заново что-то не верно!!!");
                i--;    
            }
        }
              
        for (let prop in appData) {
            console.log("Наша программа включает в себя данные: " + prop + appData);
        }
    }
};