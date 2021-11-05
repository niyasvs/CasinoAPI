const { where } = require('sequelize');
const sequelize = require('sequelize');
const { Game, Bet, User, Casino } = require('../../models');
const { gameStatuses, betStatuses } = require('../constants');
const { randomNumber } = require('../utils');

module.exports = {
    async startGame (casinoId) {
        const startTime = new Date();
        const endTime = null;
        const status = gameStatuses.STARTED;
        const game = await Game.create({ casinoId, startTime, endTime, status});
        return game.toJSON();
    },
    async stopGame (id) {
        const status = gameStatuses.ENDED;
        const endTime = new Date();
        return await Game.update({ status, endTime }, { where: { id } });
    },
    async getGame (id) {
        return await Game.findByPk(id);
    },
    async getBetAmounts(gameId) {
        return await Bet.findAll({
            attributes: [
                'betNumber',
                [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount']
            ],
            group: ['betNumber'],
            order: [[sequelize.col("totalAmount"), "DESC"]],
            where: { gameId }
        });
    },
    async checkCasinoHasEnoughtBalance (id) {
        const game = await this.getGame(id);
        const betAmounts = await this.getBetAmounts(id);
        const maxWinAmount = betAmounts[0].dataValues.totalAmount * 2;
        let maxAmountToCasino = 0;
        if (betAmounts.length > 1) {
            for (let index = 1; index < betAmounts.length; index++) {
                const amount = betAmounts[index];
                maxAmountToCasino += amount.dataValues.totalAmount
            }
        }
        const casino = await Casino.findByPk(game.casinoId);

        if (maxWinAmount > maxAmountToCasino + casino.balanceAmount)
            throw ("Casino does not have enough balance to pay if maximum amount is won");
        return true;
    },
    async calculateAmountToCasino (id) {
        let amountToCasino = 0;
        const bets = await Bet.findAll({ where: { gameId: id } });
        for (const bet of bets) {
            if (bet.dataValues.betNumber === thrownNumber) {
                await User.increment('balanceAmount', { by: bet.dataValues.amount * 2, where: { id: bet.dataValues.userId } });
                await bet.update({ betStatus: betStatuses.WON });
                amountToCasino -= bet.dataValues.amount * 2;
            }
            else {
                await bet.update({ betStatus: betStatuses.LOST });
                amountToCasino += bet.dataValues.amount;
            }
        }
        return amountToCasino;
    },
    async throwBall (id) {
        const status = gameStatuses.THROWN;
        await this.checkCasinoHasEnoughtBalance(id);
        const thrownNumber = randomNumber.generateRandomInteger(1, 36);
        await Game.update({ status, thrownNumber }, { where: { id } });
        const amountToCasino = await this.calculateAmountToCasino(id);
        await Casino.increment('balanceAmount', { by: amountToCasino, where: { id: game.casinoId } });
        return thrownNumber;
    },
    async listBettableGames (casinoId) {
        const status = gameStatuses.STARTED;
        return await Game.findAll({where: {casinoId, status}});
    }
}