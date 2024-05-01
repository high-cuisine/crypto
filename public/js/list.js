import loadCrypto from "./script.js";
const listFirst = document.querySelectorAll('ul.crypto-list li');
const cryptoButton = document.getElementById('crypto-button');

const crypto = {
    bitcoin : {
        image: './image/crypto/tether.svg',
        name:'Bitcoin',
        price: 123,
    },
    tether : {
        image: '',
        name:'Tether',
        price: 123,
    }
};

console.log(listFirst);

document.addEventListener('DOMContentLoaded', () => {
    loadCrypto();
    hideList(listFirst);
});

cryptoButton.addEventListener('click', () => {
    listFirst[0].style.opacity < 0.5 ? showList(listFirst) : hideList(listFirst);
});

const hideList = (list) => {
    list.forEach((el, index) => {
        el.style.transform = `translateY(-${index * 50 + 50}px)`;
        el.style.opacity = 0;
    });
};

const showList = (list) => {
    list.forEach((el, index) => {
        el.style.transform = `translateY(${index}px)`;
        el.style.opacity = 1;
    });
};
