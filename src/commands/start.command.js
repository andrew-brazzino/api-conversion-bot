const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');

module.exports = {
    command: 'start',
    description: 'Start command',
    action: async (ctx) => {
        const tgId = String(ctx.from.id);

        // проверка на наличие юзера в базе данных
        let user = await userService.getByIdTg(tgId);
        
        if(user) {
            await ctx.telegram.sendMessage(ctx.from.id, ruMessage.messages.start.replace("{name}", ctx.from.first_name), start())
        }
    }
};