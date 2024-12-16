const userService = require('../services/user.service');
const ruMessage = require('../lang/ru.json');

async function isUser (ctx, next) {
    const tgId = String(ctx.from.id);
    const user = await userService.getByIdTg(tgId);
    if (!user) {
        await ctx.reply(ruMessage.messages.errors.errorProtected);
        return; // Останавливаем выполнение следующих middleware
    }

    ctx.state.user = user; // Сохраняем информацию о пользователе в ctx.state
    await next(); // Переход к следующему middleware или обработчику
};

module.exports = { isUser };