const { userService, gameService, betService } = require('../services');
const { gameStatuses } = require('../constants');

module.exports = {
    async register(req, res) {
        try {
            const { name } = req.body;
            const user = await userService.createUser(name);
            return res.status(200).send({ status: "success", data: user });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async enterCasino(req, res) {
        try {
            const { userId, casinoId } = req.params;
            const user = await userService.getUser(userId);
            if (user == null) throw ('User does not exist');
            await userService.enterCasino(userId, casinoId);
            return res.status(200).send({ status: "success"});
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async recharge(req, res) {
        try {
            const { userId } = req.params;
            const { amount } = req.body;
            await userService.rechargeUser(parseInt(userId), parseInt(amount));
            return res.status(200).send({ status: "success" });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async listBettableGames (req, res) {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId);
            if (user == null) throw ('User does not exist');
            const games = await gameService.listBettableGames(user.currentCasino);
            return res.status(200).send({ status: "success", data: games });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async makeBet(req, res) {
        try {
            const { userId } = req.params;
            const { betNumber, amount, gameId } = req.body;
            const user = await userService.getUser(userId);
            if (user == null) throw ('User does not exist');
            if (user.balanceAmount < amount) throw ('User does not have enough balance to place the bet');
            const game = await gameService.getGame(gameId);
            if (game == null) throw ('Game does not exist');
            if (user.currentCasino !== game.casinoId) throw ("Game is not belong to users current casino");
            if (game.status !== gameStatuses.STARTED) throw ("Game is already stopped");
            const bet = await betService.makeBet(betNumber, amount, userId, gameId);
            return res.status(200).send({ status: "success", data: bet });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async cashOut (req, res) {
        try {
            const { userId } = req.params;
            const user = await userService.getUser(userId);
            if (user == null) throw ('User does not exist');
            const amounts = await userService.withdrawAmount(userId);
            return res.status(200).send({ status: "success", data: amounts });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    }
}