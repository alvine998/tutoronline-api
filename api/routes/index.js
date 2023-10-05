const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const cMember = require('../controllers/member.js');

    app.get('/members', middlewareHere, cMember.list);
    app.post('/member', middlewareHere, cMember.create);
    app.patch('/member', middlewareHere, cMember.update);
    app.delete('/member', middlewareHere, cMember.delete);


}