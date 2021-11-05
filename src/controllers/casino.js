const { casinoService, dealerService } = require('../services');

module.exports = {
    async register(req, res) {
        try {
            const { name } = req.body;
            const casino = await casinoService.createCasino(name);
            return res.status(200).send({status: "success", data: casino});
        } catch (error) {
            return res.status(400).send({'status': 'failed', 'message': error});
        }
    },
    async recharge(req, res) {
        try {
            const { casinoId } = req.params;
            const { amount } = req.body;
            await casinoService.rechargeCasino(parseInt(casinoId), parseInt(amount));
            return res.status(200).send({ status: "success"});
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async list(req, res) {
        try {
            const casinos = await casinoService.findAll();
            return res.status(200).send({ status: "success", data: casinos });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    }, 
    async addDealer(req, res) {
        try {
            const { name } = req.body;
            const { casinoId } = req.params;
            const casino = await dealerService.addDealer(parseInt(casinoId), name);
            return res.status(200).send({ status: "success", data: casino });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
    async listDealer(req, res) {
        try {
            const { casinoId } = req.params;
            const casinos = await dealerService.listDealer(casinoId);
            return res.status(200).send({ status: "success", data: casinos });
        } catch (error) {
            return res.status(400).send({ 'status': 'failed', 'message': error });
        }
    },
}