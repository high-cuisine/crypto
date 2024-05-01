
const linkPayment = document.getElementById('link-payment');
const params = new URLSearchParams(window.location.search);
const amount = params.get('amount');

linkPayment.addEventListener('click', function() {
    
    window.location.href = '/payment.html?amount=' + encodeURIComponent(amount);
});