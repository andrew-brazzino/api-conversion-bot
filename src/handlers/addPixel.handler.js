const ruMessage = require('../lang/ru.json');

module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboards.start[0], 
            async (ctx) => {
                await ctx.scene.enter('addPixelScene');
            }
        );
    }
};