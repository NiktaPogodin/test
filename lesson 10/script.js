class Option {
	constructor(height, width, bg, fontSize, textAlign) {
		this.height = height;
		this.width = width;
		this.bg = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;

	} 
	newDiv(text) {
		let changeDiv = document.createElement("div"); // Создали div 
		changeDiv.textContent = text; // Пример текста
        changeDiv.style.cssText = `height: ${this.height}; width: ${this.width};
        background-color: ${this.bg};  font-size: ${this.fontSize};
        text-align: ${this.textAlign};`; // Меняем зн-я
		div.appendChild(changeDiv);
	}
}
		
let newDiv = new Option("25px","200px","yellow","20px","center"); // Новые параметры
newDiv.newDiv("Пример текста"); 