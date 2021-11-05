const { Router } = require('express');

const {casino}  = require('../controllers');

const router = new Router({});
router.post('/register', casino.register);
router.get('/', casino.list);
router.put('/:casinoId/recharge', casino.recharge);
router.post('/:casinoId/dealer', casino.addDealer);
router.get('/:casinoId/dealer', casino.listDealer);

module.exports = router;