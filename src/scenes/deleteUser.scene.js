const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const { back } = require('../keyboards/back.keyboard');
const UserService = require('../services/user.service');

const deleteUserScene = new BaseScene('deleteUser');

deleteUserScene.enter(async (ctx) => {
    await ctx.reply(ruMessage.messages.deleteUser.send_id, back());
});

deleteUserScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;
    // обработка кнопки назад
    if (userInput == ruMessage.keyboards.back[0]) {
        await ctx.scene.enter('backScene')
        ctx.session = {};
        ctx.scene.leave();
        return
    }
    try{
        ctx.session.data = ctx.message.text
        const user = await UserService.getByIdOrUsername(ctx.session.data)
        if(user == null) {
            await ctx.reply(ruMessage.messages.deleteUser.notFoundUser, start());
            ctx.session = {};
            ctx.scene.leave();
            return
        }
        await ctx.reply(ruMessage.messages.deleteUser.saveSuccess.replace("{user}", ctx.session.data), start())
    } catch(error){
        console.log(error)
        await ctx.reply(ruMessage.messages.errors.errorAddedUser, start());
    }
    ctx.session = {};
    ctx.scene.leave();
})


module.exports = deleteUserScene;