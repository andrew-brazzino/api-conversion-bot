const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function start() {
    return Markup.keyboard(ruMessage.keyboards.start).resize().oneTime();
}

module.exports = { start };