const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');

module.exports = {
    command: 'start',
    description: 'Start command',
    action: async (ctx) => {

        // Пользователь существует
        await ctx.telegram.sendMessage(
            ctx.from.id,
            ruMessage.messages.start.replace("{name}", ctx.from.first_name),
            start())
        }
    }

