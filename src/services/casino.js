const { Casino } = require('../../models');

module.exports = {
    async createCasino (name) {
        const casino = await Casino.create({name});
        return casino.toJSON();
    },
    async rechargeCasino(id, amount) {
        return await Casino.increment('balanceAmount', { by: amount, where: { id } });
    },
    async findAll() {
        const casinos = await Casino.findAll();
        return casinos; 
    }
};