let money = +prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD");
console.log(money);
console.log(time);

let appData = {
    buget: 'money',
    timeData: 'time',
    expenses: {},
    optionalExpenses: {},
    income: {},
    savings: 'false',
};
console.log(appData);

answer1 = prompt("Введите обязательную статью расходов в этом месяце");
answer2 = prompt("Во сколько обойдется?");
console.log(answer1,answer2);

let output1 = answer1,
    output2 = answer2;

appData.expenses[output1] = output2;
console.log(appData.expenses);

console.log(money/30);
document.write(money/30);