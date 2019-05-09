let str = "урок-3-был слишком легким";

let str2 = str[0].toUpperCase() + str.slice(1); 
console.log(str2.replace(/-/g, ' ')); // Меняем - на пробелы 

let word = str2.substring(19,25); // Вырезаем слово легким
let newWord = word.replace(word.charAt(5),' '); // В слове легким меняем последнюю букву на пробел

newWord = newWord.replace(newWord.charAt(4), 'o'); // В слове легким меняем "и" на "о" 
alert(newWord);

let arr = [20, 33, 1, "Человек", 2, 3];
arr.splice(3,1); // Удаляем 4-й элемент

let x = 0;

for (let i = 0; i < arr.length; i++){
	x = x + Math.pow(arr[i],3); // Возводим в степень
}

let answer = Math.sqrt(x); // Извлекаем корень
console.log(answer);

function newFunc(string){
	if (typeof(string) !== 'string') { // Проверка на строку
		alert("Не строка")
	} else if (string.length < 51) { // Проверка на кол-во символов в строке
		console.log(string.trim()); // Убираем пробелы в начале и конце строки
	} else {
		string = string.slice(0, 50);
		string = string.trim();
		console.log(string + "..."); // Добовляем в конце ... если более 50-ти символов
	}
}
newFunc("     asdfasdfasdfasdfasdfasdfdsaasdfaasdfasdfasfasdfsadfasdafsdfasdf");