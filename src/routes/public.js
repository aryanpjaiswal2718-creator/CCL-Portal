const router = require('express').Router();
const controller = require('../controllers/publicController');
router.get('/ccls', controller.listCcls);
router.get('/ccls/:slug', controller.getCcl);
router.get('/ccls/:slug/content', controller.getContent);
module.exports = router;
