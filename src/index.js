'use strict';
// чекбокс 
let checkbox = document.querySelectorAll('.filter-check_checkbox');
// сосед nextElementSibling

checkbox.forEach(function(element){
    element.addEventListener('change', function(){
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');            
        } else{
            this.nextElementSibling.classList.remove('checked');            
        }
    })
})
// end чекбокс 

// корзина 

// добавить стили
// modalCart.style.cssText = 'backgroundColor: block; font-size: 30px'; 
const btnCart = document.getElementById("cart");
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');


btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';    
    document.body.style.overflow = 'hidden'});

btnClose.addEventListener('click', () => {
    modalCart.style.display = '';    
    document.body.style.overflow = '';
})

// end корзина 

// карточки товаров

const cards = document.querySelectorAll('.goods .card'),
cartWrapper = document.querySelector('.cart-wrapper'),
countGoods = document.querySelector('.counter'),
cartEpmty = document.getElementById('cart-empty');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
    const cardClone = card.cloneNode(true);
    cartWrapper.appendChild(cardClone);
    cartEpmty.remove();
    showData();
    })
});

const showData = () => {    
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
    
    console.log(cardsCart.length);
}
// 1:22 
// https://glo-academy.org/pl/teach/control/lesson/view?id=85202904&editMode=0



































/*

console.log('checkbox: ', checkbox);


*/