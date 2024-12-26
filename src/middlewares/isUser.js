const userService = require('../services/user.service');
const ruMessage = require('../lang/ru.json');

async function isUser (ctx, next) {
    const tgId = String(ctx.from.id);
    const user = await userService.getByIdTg(tgId);
    
    // Получаем всех пользователей
    const allUsers = await userService.getAll();

    if (allUsers.length === 0) {
        // Если пользователей нет, создаем первого
        await userService.add({
            tg_id: tgId,
            role: 'admin', // Первый пользователь назначается админом
            created_at: new Date()
        });
    }

    if (!user) {
        await ctx.reply(ruMessage.messages.errors.errorProtected);
        return; // Останавливаем выполнение следующих middleware
    }

     await userService.update(tgId, {username: ctx.from.username})

    ctx.state.user = user; // Сохраняем информацию о пользователе в ctx.state
    await next(); // Переход к следующему middleware или обработчику
};

module.exports = { isUser };