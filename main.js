const { Telegraf, Scenes } = require('telegraf');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const LocalSession = require('telegraf-session-local');
const connectToMongo = require('./src/services/db');
const { isUser } = require('./src/middlewares/isUser');

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  process.exit(1);
}


const bot = new Telegraf(botToken);
connectToMongo()

const { Stage } = Scenes;

bot.use(isUser);


// Использование локальной сессии
const localSession = new LocalSession({ database: 'session_db.json' });
bot.use(localSession.middleware());

// Подготовка Stage для сцен
const stage = new Stage();
bot.use(stage.middleware());


// Регистрация сцен
const scenesPath = path.join(__dirname, 'src/scenes');
fs.readdirSync(scenesPath).forEach(file => {
  if (file.endsWith('.js')) {
    const scene = require(`./src/scenes/${file}`);
    stage.register(scene);
  }
});

// Регистрация команд
const commandsFiles = fs.readdirSync(path.join(__dirname, 'src/commands')).filter(file => file.endsWith('.js'));
commandsFiles.forEach(file => {
  const command = require(`./src//commands/${file}`);
  if (command.middleware) {
    bot.command(command.command, command.middleware, command.action);
  } else {
    bot.command(command.command, command.action);
  }
});

// Регистрация хендлеров
const handlersPath = path.join(__dirname, 'src/handlers');
fs.readdirSync(handlersPath).forEach(file => {
  if (file.endsWith('.js')) {
    const { handler } = require(`./src/handlers/${file}`);
    handler(bot);
  }
});

// Запуск бота
bot.launch();
