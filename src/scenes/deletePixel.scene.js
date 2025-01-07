const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const { back } = require('../keyboards/back.keyboard');
const PixelService = require('../services/pixel.service');

const deletePixelScene = new BaseScene('deletePixelScene');

deletePixelScene.enter(async (ctx) => {
    ctx.session.step = 1;
    await ctx.reply(ruMessage.messages.deletePixel.sendPixel, back());
});

deletePixelScene.on('text', async (ctx) => {

    const step = ctx.session.step;

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
                const pixel = await PixelService.get(ctx.session.pixel)
                // Проверяем наличие пикселя и токена
                if (pixel) {
                    await PixelService.delete(pixel.pixel)
                    await ctx.reply(ruMessage.messages.deletePixel.deleteSuccess.replace("{pixel}", pixel.pixel), start());
                    ctx.session = {};
                    ctx.scene.leave();
                    return;
                }
                break;
            default:
                await ctx.reply(ruMessage.messages.errors.errorDeletePixel, start());
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





module.exports = deletePixelScene;