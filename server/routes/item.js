const router = require('express').Router();
const { isAuth, isInRole } = require('../config/auth-check');

const itemController = require('../controllers/item');

router.get('/allApproved', itemController.getAllItems);
router.post('/create', isInRole('Admin'), itemController.createItem);

module.exports = router;