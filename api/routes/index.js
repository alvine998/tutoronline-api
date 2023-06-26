const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const users = require('../controllers/user.js');
    const customers = require('../controllers/customer.js');
    // const categories = require('../controllers/category.js');
    const apps = require('../controllers/app.js');
    // const stocks = require('../controllers/stock.js');
    // const prices = require('../controllers/price.js');

    app.get('/users', middlewareHere, users.list);
    app.post('/user', middlewareHere, users.create);
    app.post('/user/auth', middlewareHere, users.login);
    app.patch('/user', middlewareHere, users.update);
    app.delete('/user', middlewareHere, users.delete);

    app.get('/customers', middlewareHere, customers.list);
    app.post('/customer', middlewareHere, customers.create);
    app.patch('/customer', middlewareHere, customers.update);
    app.delete('/customer', middlewareHere, customers.delete);

    // app.get('/categories', middlewareHere, categories.list);
    // app.post('/category', middlewareHere, categories.create);
    // app.patch('/category', middlewareHere, categories.update);
    // app.delete('/category', middlewareHere, categories.delete);

    app.get('/apps', middlewareHere, apps.list);
    app.post('/app', middlewareHere, apps.create);
    app.patch('/app', middlewareHere, apps.update);
    app.delete('/app', middlewareHere, apps.delete);

    // app.get('/stocks', middlewareHere, stocks.list);
    // app.post('/stock', middlewareHere, stocks.create);
    // app.patch('/stock', middlewareHere, stocks.update);
    // app.delete('/stock', middlewareHere, stocks.delete);

    // app.get('/prices', middlewareHere, prices.list);
    // app.post('/price', middlewareHere, prices.create);
    // app.patch('/price', middlewareHere, prices.update);
    // app.delete('/price', middlewareHere, prices.delete);


}