window.addEventListener('DOMContentLoaded', function() {

    "use strict";
	let tab = require('./parts/tabs.js'),
        form = require('./parts/form.js'),
        slider = require('./parts/slider.js'),
        timer = require('./parts/timer.js'),
        modal = require('./parts/modal.js'),
        calc = require('./parts/calc.js');

    tab();
    form();
    slider();
    timer();
    calc();
    modal();
});