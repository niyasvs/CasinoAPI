const { Bet } = require('../../models');
const { betStatuses } = require('../constants');
const userService = require('./user');

module.exports = {
    async makeBet(betNumber, amount, userId, gameId) {
        const bettingTime = new Date();
        const betStatus = betStatuses.BETTED;
        const bet = await Bet.create({betNumber, amount, userId, gameId, bettingTime, betStatus});
        await userService.withdrawAmount(userId, amount);
        return bet.toJSON();
    }
}