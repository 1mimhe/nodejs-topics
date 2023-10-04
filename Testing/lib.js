
function absolute(number) {
    return number >= 0 ? number : -number;
}

function welcome(name) {
    return 'Welcome' + name;
}

function getCurrencies() {
    return ['USD', 'EUR', 'AUD'];
}

function getProduct() {
    return { id: 1, price: 10, category: 'a' };
}

module.exports = {
    absolute,
    welcome,
    getCurrencies,
    getProduct
};