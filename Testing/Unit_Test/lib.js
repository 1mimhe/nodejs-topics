const db = require('./db');
const mail = require('./mail');

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

function registerUser(username) {
    if (!username) throw new Error('Username is required.');

    return { id: new Date().getTime(), username };
}

function applyDiscount(order) {
    const user = db.getUserSync(order.userID);

    if (user.points > 10)
        order.totalPrice = order.totalPrice * 0.9;
}

function notifyUser(order) {
    const user = db.getUserSync(order.userID);

    mail.send(user.email, 'Your order was placed successfully.')
}

module.exports = {
    absolute,
    welcome,
    getCurrencies,
    getProduct,
    registerUser,
    applyDiscount,
    notifyUser
};