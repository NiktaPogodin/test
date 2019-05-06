function startTime() {
    let time = new Date(),
        hour = time.getHours(),
	    min = time.getMinutes(),
	    sec = time.getSeconds();

	hour = appendZero(hour);
	min = appendZero(min);
	sec = appendZero(sec);

	document.getElementById('timer').textContent = hour + ":" + min + ":" +sec;
	time = setTimeout(startTime,1000);
}
startTime();

function appendZero(i) {
	if (i < 10){	
		i = "0" + i;
	}
	return i;
}
