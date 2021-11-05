const { Router } = require('express');

const { user } = require('../controllers');

const router = new Router({});
router.post('/register', user.register);
router.put('/:userId/enterCasino/:casinoId', user.enterCasino);
router.put('/:userId/recharge', user.recharge);
router.get('/:userId/bettableGames', user.listBettableGames);
router.post('/:userId/makeBet', user.makeBet);
router.post('/:userId/cashOut', user.cashOut);

module.exports = router;    