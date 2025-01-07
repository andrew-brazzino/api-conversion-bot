const userService = require('../services/user.service');
const ruMessage = require('../lang/ru.json');

async function isUser (ctx, next) {
    const tgId = String(ctx.from.id);
    let user = await userService.getByIdTg(tgId);
    
    
    const allUsers = await userService.getAll();

    if (allUsers.length === 0) {
        
        await userService.add({
            tg_id: tgId,
            role: 'admin', 
            created_at: new Date()
        });
    }

    if (!user) {
        await ctx.reply(ruMessage.messages.errors.errorProtected);
        return;
    }

    
    if (ctx.from.username && user.username !== ctx.from.username) {
        user = await userService.update(tgId, { username: ctx.from.username });
    }

    ctx.state.user = user;
    await next(); 
};

module.exports = { isUser };