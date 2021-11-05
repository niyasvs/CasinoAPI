const { dealerService, gameService } = require('../services');
const { gameStatuses } = require('../constants');

module.exports = {
    async startGame(req, res) {
        try {
            const { dealerId } = req.params;
            const dealer = await dealerService.getDealer(dealerId);
            if(dealer == null) throw('Dealer does not exist');
            const game = await gameService.startGame(dealer.casinoId);
            return res.status(200).send({ status: "success", data: game });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async stopGame(req, res) {
        try {
            const { dealerId, gameId } = req.params;
            const dealer = await dealerService.getDealer(dealerId);
            if (dealer == null) throw ('Dealer does not exist');
            const game = await gameService.getGame(gameId);
            if (game == null) throw ('Game does not exist');
            if (dealer.casinoId !== game.casinoId) throw ("Game does not belong to this dealer's casino");
            await gameService.stopGame(gameId);
            return res.status(200).send({ status: "success" });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async throwBall(req, res) {
        try {
            const { dealerId, gameId } = req.params;
            const dealer = await dealerService.getDealer(dealerId);
            if (dealer == null) throw ('Dealer does not exist');
            const game = await gameService.getGame(gameId);
            if (game == null) throw ('Game does not exist');
            if (dealer.casinoId !== game.casinoId) throw ("Game does not belong to this dealer's casino");
            if (game.status == gameStatuses.STARTED) throw ("Game is not yet stopped. Please stop the game before throwing ball.");
            if (game.status == gameStatuses.THROWN) throw ("Game is already thrown");
            const thrownNumber = await gameService.throwBall(gameId);
            return res.status(200).send({ status: "success", data: {thrownNumber} });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });

        }
    }
}