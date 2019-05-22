function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        total = 0;
        
        totalValue.innerHTML = 0;   
        
        function checkInput(input) {
            input.addEventListener('keypress', function(evt) {
                if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            });
        }
        
        checkInput(persons);
        checkInput(restDays);
        
        function result(input) {
            input.addEventListener('change', function() {
                total = (+restDays.value + (+persons.value))*4000*place.value;
                
                if(restDays.value == '' || persons.value == '') {
                    totalValue.innerHTML = 0;
                } else {
                    totalValue.innerHTML = total;
                }
            });
        }

        result(persons);
        result(restDays);
        result(place);
    }
    
    module.exports = calc;