const ruMessage = require('../lang/ru.json');

module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboards.admin_start[0], 
            async (ctx) => {
                await ctx.scene.enter('addUser');
            }
        );
    }
};