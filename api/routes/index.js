const { middlewareHere } = require('../middleware/index.js');

module.exports = (app) => {
    const cAdmin = require('../controllers/admin.js');
    const cTalent = require('../controllers/talent.js');
    const cTutor = require('../controllers/tutor.js');
    const cModule = require('../controllers/module.js');

    app.get('/admins', middlewareHere, cAdmin.list);
    app.post('/admin', middlewareHere, cAdmin.create);
    app.patch('/admin', middlewareHere, cAdmin.update);
    app.delete('/admin', middlewareHere, cAdmin.delete);
    
    app.post('/user/auth', middlewareHere, cAdmin.login);

    app.get('/talents', middlewareHere, cTalent.list);
    app.post('/talent', middlewareHere, cTalent.create);
    app.patch('/talent', middlewareHere, cTalent.update);
    app.delete('/talent', middlewareHere, cTalent.delete);
    app.post('/talent/verification', middlewareHere, cTalent.verificationTalent);

    app.get('/tutors', middlewareHere, cTutor.list);
    app.post('/tutor', middlewareHere, cTutor.create);
    app.patch('/tutor', middlewareHere, cTutor.update);
    app.delete('/tutor', middlewareHere, cTutor.delete);
    app.post('/tutor/verification', middlewareHere, cTutor.verificationTutor);

    app.get('/modules', middlewareHere, cModule.list);
    app.post('/module', middlewareHere, cModule.create);
    app.patch('/module', middlewareHere, cModule.update);
    app.delete('/module', middlewareHere, cModule.delete);
}