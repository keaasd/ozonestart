'use strict';
// чекбокс 
let checkbox = document.querySelectorAll('.filter-check_checkbox');
// сосед nextElementSibling
function toogleChecbox() {
    checkbox.forEach(function (element) {
        element.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        })
    })
    // end чекбокс 
}

function toggleCart() {

    // корзина 

    // добавить стили
    // modalCart.style.cssText = 'backgroundColor: block; font-size: 30px'; 
    const btnCart = document.getElementById("cart");
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');


    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden'
    });

    btnClose.addEventListener('click', () => {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    })
    // end корзина 
}

// карточки товаров

// ищем карточки в диве .goods ".card". 
// перебираем через переменную 'card' 
const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    countGoods = document.querySelector('.counter'),
    cartEpmty = document.getElementById('cart-empty');

function addCart() {
    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            // cartEpmty.remove(); удалили во втором дне 
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';

            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            })
        })
    });
    // .textContent = cardsCart.length;
    const showData = () => {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cartTotal = document.querySelector('.cart-total span');
        let sum = 0;

        countGoods.textContent = cardsCart.length;
        if (cardsCart.length !== 0) {
            cartEpmty.remove();
        } else {
            cartWrapper.appendChild(cartEpmty);
        }
        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cartTotal.textContent = sum;
        // console.log(cartTotal);

    }
}

// фильтры 
function actionPage() {

    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        goods = document.querySelector('.goods'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

    // фильтр по акции 
    discountCheckbox.addEventListener('click', filter);

    // фильты по цене 
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    // поиск 
    searchBtn.addEventListener('click', () => {
        // регулярные выражения RegExp для любого регитсра
        // .trim пробелы убирает
        // i - игнорирует большие мал буквы
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            // test() true или false показывает
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }

        });
        search.value = '';
    });

    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discound = card.querySelector('.card-sale');

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discound) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        })
    }
};


// innertext медленее работате
// 2:10
// https://glo-academy.org/pl/teach/control/lesson/view?id=85202905





// получение данных с сервера
async function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Данные не были получены, ошибка: " + response.status);
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px" >Упс что-то пошло не так</div>'
        });
        // .then(data => renderCards(data)).catch(err => {
        //     return data;
        //     goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px" >Упс что-то пошло не так</div>'
        // })
}
// выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        
        const card = document.createElement('div');
        card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        card.innerHTML = `
					<div class="card" data-category='${good.category}'>
                    ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                        
						<div class="card-img-wrapper">
							<span class="card-img-top"
								style="background-image: url('${good.img}')"></span>
						</div>
						<div class="card-body justify-content-between">
							<div class="card-price" style = "${good.sale ? 'color: red' : ''}" >${good.price} ₽</div>
							<h5 class="card-title">${good.title}</h5>
							<button class="btn btn-primary">В корзину</button>
						</div>
					</div>
						
`;
        goodsWrapper.appendChild(card)
    })
}
// ---end получение данных с сервера

// каталог 
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const catalog = new Set();
    cards.forEach((card) => {
        catalog.add(card.dataset.category);
    });

    category.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });
    catalogBtn.addEventListener('click', (event) => {
        if(catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        if (event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            })
        }
    });

}
getData().then((data) => {
    renderCards(data)
    toogleChecbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});
