const { Dealer } = require('../../models');

module.exports = {
    async addDealer(casinoId, name) {
        const dealer = await Dealer.create({ name, casinoId });
        return dealer.toJSON();
    },
    async listDealer(casinoId) {
        const dealers = await Dealer.findAll({ where: { casinoId } });
        return dealers;
    },
    async getDealer(dealerId) {
        return await Dealer.findByPk(dealerId);
    }
}