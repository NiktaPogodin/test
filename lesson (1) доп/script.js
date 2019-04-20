
let num = 33721;

function getSumNumber(num) {
        var composition = 1, tmp;
        while (num) {
            tmp = num % 10; // Деление по модулю 2. Находим остаток 
            num = (num - tmp) / 10; // Целое
            composition *= tmp; // Умножаем и записываем ответ в composition 
        }
        return composition; // Возвращяет зн-я
    }

let exponent = 3,//Степень
    result = 1;

for (i = 0; i < exponent; i++) {
    result *= (getSumNumber(num));// result = result * 126
}
console.log(result);// 2000376

convert = ( String(result) + ""); // Преобразовал число в строку

str = convert[0] + convert[1];
alert(str);
