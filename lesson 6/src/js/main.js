let startBtn = document.getElementById('start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
	
	expensesItem = document.querySelectorAll('.expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
	countBtn = document.getElementsByTagName('button')[2],
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item')
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
	percentValue = document.querySelector('.choose-percent'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value');

let money, time, sum, allSum;

    /*    НАЧАТЬ РАСЧЕТ    */

	startBtn.addEventListener('click', function() {
		
	time = prompt("Введите дату в формате YYYY-MM-DD", '');
	money = +prompt("Ваш бюджет на месяц?", '');

	while (isNaN(money) || money == '' || money == null) { // Проверка на число
		money = +prompt("Ваш бюджет?", '');
	}

	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed(); // Бюджет на 1 день
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDay();
});

	/*   ОБЯЗАТЕЛЬНЫЕ РАСХОДЫ    */

expensesBtn.addEventListener("click", function(event) {	
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,  // Наименование 1
			b = expensesItem[++i].value,// Цена 1
			c = expensesItem[2].value,  // Наименование 2
			d = expensesItem[3].value;  // Цена 2
			
		if (a == '' || b == '' || c == ''|| d == '') { // Проверка на заполнение строк
			event.disabled = true;
		} else if ((typeof(a))=== 'string' && (typeof(a)) != null && (typeof(b)) != null
			&& a != '' && b != '' && a.length < 50) { // Проверка на строку
			console.log('Done');
			appData.expenses[a] = b; // Запись в expenses в формате [..] = ..
			sum += +b; // Цена записывается в сумму
			allSum = sum; // Результ. помещяем в allSum, чтобы вывести числом в Бюджете на 1 день
			expensesValue.textContent = sum; // Записываем в обязательные расходы
		} else if (a || b === null && a || b === '' && a || b != true){
			i--;
		}
	} 	
});

	/*    НЕОБЯЗАТЕЛЬНЫЕ РАСХОДЫ    */

optionalExpensesBtn.addEventListener("click", function(event) {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let a = optionalExpensesItem[i].value, // Первый input 
			b = optionalExpensesItem[1].value, // Второй input 
			c = optionalExpensesItem[2].value; // Третий input 

		if (a == '' || b == '' || c == '') {  // Проверка на заполнение строк
			optionalExpensesBtn.disabled = true; 
		} else if ((typeof(a)) === 'string' && a != '' && (typeof(a)) != null) { // Проверка на строку
			optionalExpensesBtn.disabled = false;
			appData.optionalExpenses[i] = a; // Запись в формате 0: ".." 1: ".." 2: ".."
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; // Запись в объект optionalExpenses
			console.log('Done');
		} else {
			event.disabled = true;
		}
	}
});

	/*    РАСЧЕТ ДНЕВНОГО БЮДЖЕТА    */

countBtn.addEventListener("click", function() {
	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - allSum) / 30).toFixed(); // Доход - Сумма / 30
		dayBudgetValue.textContent = appData.moneyPerDay; // Запись в бюджет на 1 день

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			levelValue.textContent = "Произошла ошибка";
		}
	} else {
		dayBudgetValue.textContent = "Начните расчет";
	}
});

	/*     СТАТЬИ ВОЗМОЖНОГО ДОХОДА    */

incomeItem.addEventListener("input", function(event) {
	let items = incomeItem.value;

	if (startBtn.disabled == true) {
		appData.income = items.split(', ');
		incomeValue.textContent = appData.income;  // Запись в доп.доход
	} else {
		event.preventDefault(); // Блокируем input
	}
});

	/*     НАКОПЛЕНИЯ    */

checkSavings.addEventListener("click", function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}	
});

	/*     СУММА     */

sumValue.addEventListener("input", function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;
		
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1); // Накопления за 1 месяц 
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1); // Накопления за 1 год
	}
});

	/*     ПРОЦЕНТЫ    */

percentValue.addEventListener("input", function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;
		
		monthSavingsValue.textContent = appData.monthIncome.toFixed(1); // Накопления за 1 месяц 
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1); // Накопления за 1 год
	}
});

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
};