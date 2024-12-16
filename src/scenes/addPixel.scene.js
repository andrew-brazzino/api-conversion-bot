const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const { back } = require('../keyboards/back.keyboard');

const addPixelScene = new BaseScene('addPixelScene');

addPixelScene.enter(async (ctx) => {
    ctx.session.step = 1;
    await ctx.reply(ruMessage.messages.addPixel.sendPixel, back());
});

addPixelScene.on('text', async (ctx) => {

    const userInput = ctx.message.text;
    // обработка кнопки назад
    if (userInput == ruMessage.keyboards.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.session = {};
        ctx.scene.leave();
        return
    }
    try{
        switch (step) {
            case 1:
                ctx.session.pixel = ctx.message.text
                await ctx.reply(ruMessage.messages.addPixel.sendToken, back())
                break;
            case 2:
                ctx.session.token = ctx.message.text
                await ctx.reply(ruMessage.messages.added_pwa.saveSuccess, back())
                ctx.session = {};
                ctx.scene.leave();
                break;
            default:
                await ctx.reply(ruMessage.messages.errors.errorAddedPixel, start());
                ctx.session = {};
                ctx.scene.leave();
                break;
        }
        
    } catch(error){
        console.log(error)
        await ctx.reply(ruMessage.messages.errors.errorAddedPixel, start());
        ctx.session = {};
        ctx.scene.leave();
    }
    ctx.session.step++;


})





module.exports = addPixelScene;