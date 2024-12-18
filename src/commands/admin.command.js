const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const { isAdmin } = require('../middlewares/isAdmin');

module.exports = {
    command: 'admin',
    description: 'Admin start command',
    action: async (ctx) => {
        await ctx.telegram.sendMessage(
            ctx.from.id,
            ruMessage.messages.start.replace("{name}", ctx.from.first_name),
            start())
        },
        middleware: isAdmin
    }

