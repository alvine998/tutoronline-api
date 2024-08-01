const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const cAdmin = require('../controllers/admin.js');

    app.get('/admins', middlewareHere, cAdmin.list);
    app.post('/admin', middlewareHere, cAdmin.create);
    app.patch('/admin', middlewareHere, cAdmin.update);
    app.delete('/admin', middlewareHere, cAdmin.delete);
    app.post('/admin/auth', middlewareHere, cAdmin.login);
}