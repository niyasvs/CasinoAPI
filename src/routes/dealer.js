const { Router } = require('express');

const { dealer } = require('../controllers');

const router = new Router({});

router.post('/:dealerId/startGame', dealer.startGame);
router.post('/:dealerId/stopGame/:gameId', dealer.stopGame);
router.post('/:dealerId/throwBall/:gameId', dealer.throwBall);

module.exports = router;