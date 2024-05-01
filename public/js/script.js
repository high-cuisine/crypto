// import crypto from './moduls/crypto.js';
// import banks from './moduls/banks.js';

const cryptoContainer = document.querySelector('.button-container');
const cryptoButton = document.getElementById('crypto-button');
const cryptoList = document.querySelector('.crypto-list');
const banksList = document.querySelector('.banks-list');
const banksButton = document.getElementById('bank-button');

const bankInput = document.getElementById('bank-input');
const cryptoInput = document.getElementById('crypto-input');
const cryptoMin = document.getElementById('crypto-min');
const cryptoMax = document.getElementById('crypto-max');

let cryptoContent;
let currentCrypto = 0;

let amout;

const createCryptoList = (crypto, button, active) => {
    const keys = Object.keys(crypto);
    cryptoContent = '';
    for (let i = 0; i < keys.length; i++) {
        if(keys[i] === undefined) continue;

        if(i === active) { 
            currentCrypto = i;
            button.innerHTML = `
            <div class="crypto-content">
                <div class="crypto-header">
                    <img class="crypto-img" src="${crypto[keys[i]].image}">
                    <div>${crypto[keys[i]].name}</div>
                </div>
                <img class="crypto-arrow" src="./image/arrow.svg">
            </div>
            `;
            cryptoContent += `
            <li class= active>
                <div class="crypto-content">
                    <div class="crypto-header">
                        <img class="crypto-img" src="${crypto[keys[i]].image}">
                        <div>${crypto[keys[i]].name}</div>
                    </div>
                </div>
            </li>
            `;
            
        } else
        cryptoContent += `
        <li>
            <div class="crypto-content">
                <div class="crypto-header">
                    <img class="crypto-img" src="${crypto[keys[i]].image}">
                    <div>${crypto[keys[i]].name}</div>
                </div>
            </div>
        </li>
        `;
    }
    return cryptoContent;
}

const calculatePrice = (cryptoObject, count = 1, active) => {
    

    const keys = Object.keys(cryptoObject);
    for (let i = 0; i < keys.length; i++) {
        if(keys[i] === undefined) continue;

        if(i === active) {
            setNewPrice(cryptoObject[keys[i]]);
            return cryptoObject[keys[i]].price * count;
        }
    }
    return 0;
}

const loadCrypto = (index) => {
    cryptoList.innerHTML = createCryptoList(crypto, cryptoButton, index);
    listFirst = document.querySelectorAll('.crypto-list li');
    calculatePrice(crypto, 1, 0);

    banksList.innerHTML = createCryptoList(Banks, banksButton, index);
    secondList = document.querySelectorAll('.banks-list li');
    banksList.style.zIndex = -10;
}

const crypto = {
    bitcoin : {
        image: './image/crypto/tether.svg',
        name:'Bitcoin',
        price: 61640.60,
    },
    tether : {
        image: '#',
        name:'Tether',
        price: 1,
    },
    solana : {
        image:'#',
        name: 'Solana',
        price: 134.54,
    },
    ENA : {
        image:'#',
        name: 'ENA',
        price: 0.089529,
    }
};
const Banks = {
    HSBC : {
        id:1,
        image: '#',
        name:'HSBC',
    },
    BNPParibas : {
        id:2,
        image: '#',
        name:'BNP Paribas ',
    },
    CreditAgricoleGroup : {
        id:3,
        image: '#',
        name:'Credit Agricole Group',
    },
    DeutscheBankAG : {
        id:4,
        image: '#',
        name:'Deutsche Bank AG',
    },
    SantanderGroup : {
        id:5,
        image: '#',
        name:'Santander Group',
    },
    UniCreditGroup : {
        id:6,
        image: '#',
        name:'UniCredit Group',
    },
    INGGroup : {
        id:7,
        image: '#',
        name:'ING Group',
    },
    LloydsBankingGroup : {
        id:8,
        image: '#',
        name:'Lloyds Banking Group',
    },
    CréditMutuelCICGroup : {
        id:9,
        image: '#',
        name:'Crédit Mutuel-CIC Group',
    },
};
let listFirst;
let secondList;

document.addEventListener('DOMContentLoaded', () => {
    loadCrypto(0);
    hideList(listFirst);

    hideList(secondList);
    
});


cryptoButton.addEventListener('click', () => {
    if(listFirst[0].style.opacity < 0.5) {
        showList(listFirst)
        banksButton.style.zIndex = '0';
    }
    else {
        hideList(listFirst);
        banksButton.style.zIndex = '30';
    }
    
});

banksButton.addEventListener('click', () => {
    if(secondList[0].style.opacity < 0.5) { 
        showList(secondList);
        banksList.style.zIndex = 0;
    } else{ 
        banksList.style.zIndex = -10;
        hideList(secondList);
        
    }
});

cryptoInput.addEventListener('input', function() {
    amout = calculatePrice(crypto, cryptoInput.value, currentCrypto);
});

const hideList = (list) => {
    list.forEach((el, index) => {
        el.style.transform = `translateY(-${index * 50 + 50}px)`;
        el.style.opacity = 0;
    });
};

const newActiveElCrypto = (index) => {
    cryptoList.innerHTML = createCryptoList(crypto, cryptoButton, index);
    listFirst = document.querySelectorAll('.crypto-list li');
    
    amout = calculatePrice(crypto, cryptoInput.value, index);
    console.log(amout);
};
const newActiveElBanks = (index) => {
    banksList.innerHTML = createCryptoList(Banks, banksButton, index);
    secondList = document.querySelectorAll('.banks-list li');
};

const showList = (list) => {
    list.forEach((el, index) => {
        el.style.transform = `translateY(${index}px)`;
        el.style.opacity = 1;
    });
    
    listFirst.forEach((el,index) => {
        el.addEventListener('click', function() {
            newActiveElCrypto(index);
            showList(listFirst);
        })
    });
    secondList.forEach((el,index) => {
        el.addEventListener('click', function() {
            newActiveElBanks(index);
            showList(secondList);
        })
    });
};

const setNewPrice = (cryptoObject) => {
    if(!cryptoObject.price) {
        cryptoMin.innerHTML = '';
        cryptoMax.innerHTML = '';
    }
    cryptoMin.innerHTML = `${250 / cryptoObject.price} ${cryptoObject.name}`;
    cryptoMax.innerHTML = `${5155.72 / cryptoObject.price} ${cryptoObject.name}`;
};

export {amout};
