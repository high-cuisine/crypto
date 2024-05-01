import {amout} from "./script.js";

const cardNumber = document.getElementById('card-input');
const country = document.getElementById('country-input');
const email = document.getElementById('email-input');
const bankName = document.getElementById('bank-name-input');
const iban = document.getElementById('idan-input');
const telegram = document.getElementById('telegram-input');
const city = document.getElementById('city-input');

const sumbitButton = document.getElementById('sumbit-button');

const datesError = document.getElementById('dates-error');
const checks = document.querySelectorAll('.check input');

let error;

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
    return /^\+\d{1,3}\d{9,15}$/.test(phone);
}

function validateIBAN(iban) {
    if (typeof iban !== 'string') {
        return false;
    }

    iban = iban.replace(/\s/g, '');

    if (!/^[a-zA-Z0-9]+$/.test(iban)) {
        return false;
    }

    if (iban.length < 15 || iban.length > 34) {
        return false;
    }

    return true;
}

function valiDate(country) {
    return /^[^\d]+$/.test(country);
}
function validateTelegramId(telegramId) {
    return true;
}

function validateCreditCard(cardNumber) {
    cardNumber = cardNumber.replace(/\s/g, '');

    // Проверяем, является ли cardNumber строкой
    if (typeof cardNumber !== 'string') {
        return false;
    }

    // Проверяем, содержит ли номер карты ровно 16 цифр и не содержит ли других символов, кроме цифр
    return /^\d{16}$/.test(cardNumber);
  }


sumbitButton.addEventListener('click', async function() {
    if( validateCreditCard(cardNumber.value) &&
        valiDate(country.value) &&
        validateEmail(email.value) &&
        valiDate(bankName.value) &&
        validateIBAN(iban.value) &&
        validateTelegramId(telegram.value) &&
        valiDate(city.value)) {
            if(checks[0].checked && checks[1].checked) {
                datesError.innerHTML = '';
                try {
                    const response = await fetch('/api/dates', {
                        method: 'POST',
                        headers: {'Content-type' : 'application/json'},
                        body: JSON.stringify({
                            email: email.value,
                        })
                    });
                    window.location.href = '/application.html?amount=' + encodeURIComponent(amout);
                }

                catch {
                    console.log('error to post dates');
                }
            }
            else {
                datesError.innerHTML = 'error1'
            }
    }
    else {
        datesError.innerHTML = 'error'
    }
});
