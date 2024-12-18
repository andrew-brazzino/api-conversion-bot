const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function start() {
    return Markup.keyboard(ruMessage.keyboards.admin_start).resize().oneTime();
}

module.exports = { start };