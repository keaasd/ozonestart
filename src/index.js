'use strict';
// чекбокс 
let checkbox = document.getElementById('discount-checkbox');
checkbox.addEventListener('change', function() {
    if(this.checked) {
        this.nextElementSibling.classList.add('checked')    
    } else {
        this.nextElementSibling.classList.remove('checked')     
    }
}   )
// end чекбокс 
// 1:22 
// https://glo-academy.org/pl/teach/control/lesson/view?id=85202904&editMode=0
