const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function back() {
    return Markup.keyboard(ruMessage.keyboards.start).resize().oneTime();
}

module.exports = { back };