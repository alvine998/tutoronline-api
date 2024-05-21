const { middlewareHere, middlewarePackageName } = require('../middleware/index.js');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${file?.originalname}`)
    }
})
const upload = multer({
    storage: storage
})

module.exports = (app) => {
    const cPartner = require('../controllers/partner.js');
    const cUpload = require('../controllers/upload.js');
    const cCategory = require('../controllers/category.js');
    const cSubCategory = require('../controllers/subcategory.js');

    app.get('/partners', middlewareHere, cPartner.list);
    app.post('/partner', middlewareHere, cPartner.create);
    app.patch('/partner', middlewareHere, cPartner.update);
    app.delete('/partner', middlewareHere, cPartner.delete);

    app.post('/file-upload', upload.single('file'), cUpload.upload);

    app.get('/categories', middlewareHere, middlewarePackageName, cCategory.list);
    app.post('/category', middlewareHere, middlewarePackageName, cCategory.create);
    app.patch('/category', middlewareHere, middlewarePackageName, cCategory.update);
    app.delete('/category', middlewareHere, middlewarePackageName, cCategory.delete);

    app.get('/subcategories', middlewareHere, middlewarePackageName, cSubCategory.list);
    app.post('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.create);
    app.patch('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.update);
    app.delete('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.delete);
}