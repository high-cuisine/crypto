const amountDates = document.getElementById('amount-dates');
const linkPayment = document.getElementById('link-payment');

linkPayment.addEventListener('click', function() {
    window.location.href = '/application.html?amount=' + encodeURIComponent(amount);
});

const params = new URLSearchParams(window.location.search);
    const amount = params.get('amount');
    amountDates.innerHTML = `: ${amount} USDT`;
    console.log('Сумма для оплаты:', amount);

