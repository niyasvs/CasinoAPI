const { Casino, Dealer, User } = require('../../models');

module.exports = {
    async createUser(name) {
        const user = await User.create({ name });
        return user.toJSON();
    },
    async enterCasino(id, casinoId) {
        return await User.update({currentCasino: casinoId}, {where: {id}});
    },
    async rechargeUser(id, amount) {
        return await User.increment('balanceAmount', { by: amount, where: { id } });
    },
    async getUser(id) {
        return await User.findByPk(id);
    },
    async withdrawAmount(id, amount) {
        let amountWithdrawn = amount;
        let balanceAmount = 0;
        const user = await this.getUser(id);
        const currentBalance = user.balanceAmount;
        if(amount == undefined) {
            await User.update({ balanceAmount: 0 }, { where: { id } });
            amountWithdrawn = currentBalance;
        }
        else {
            if(amount>currentBalance) throw("Balance is less than requested withdrawal");
            await User.decrement('balanceAmount', { by: amount, where: { id } });
            balanceAmount = currentBalance - amount;
        }
        return { amountWithdrawn, balanceAmount };
    },
};