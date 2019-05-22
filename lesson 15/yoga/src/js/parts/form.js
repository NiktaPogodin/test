function form() {
    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form');   
    
    function sendForm(elem) {
        let input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            
        let message = {
            loading: '<img src="../../img/loading.gif">',
            success: '<img src="../../img/success.svg">',
            failure: '<img src="../../img/failure.png">',
        };

        elem.addEventListener('submit', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData() {
                    return new Promise(function(resolve,reject) {
                        let request =  new XMLHttpRequest();
                        request.open('POST', 'server.php');                      
                        request.setRequestHeader("Content-Type","application/json; charset=utf-8");

                        request.addEventListener('readystatechange', ()=> {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4 && request.status === 200) {
                                resolve()
                            } else {
                                reject()
                            }
                        });

                        request.send(formData);
                    });
                } // End postData

                /*  Очищяем поля ввода  */

                function clearInterval() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    }
                }

                postData(formData)
                    .then(()=> statusMessage.innerHTML = message.loading)
                    .then(()=> statusMessage.innerHTML = message.success)
                    .catch(()=> statusMessage.innerHTML = message.failure)
                    .then(clearInterval);
        });
    }

    sendForm(form);
    sendForm(contactForm);
}

module.exports = form;