const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Модуль для асинхронного подключения к базе данных
 * @async
 * @function connectToMongo
 * @throws {Error} Если не удастся подключиться к базе данных
 * @returns {Promise<void>}
 */
async function connectToMongo() {
  try {
    // Массив переменных из env
    const requiredEnv = ['DB_LOGIN', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_NAME'];

    // Проверка на наличие в env всех необходимых переменных
    for (let env of requiredEnv) {
      if (!process.env[env]) {
        throw new Error(`Отсутствует необходимая переменная в env: ${env}`);
      }
    }

    // Деструктуризация массива
    const { DB_LOGIN, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

    // Сборка URI строки для подключения к mongo db
    const mongoURI = `mongodb://${DB_LOGIN}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    // Соединение с Mongo
    await mongoose.connect(mongoURI, {
      directConnection: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Successfully connected to MongoDB');

    // Объект соединения с базой
    const db = mongoose.connection;

    // Обработка ошибок подключения
    db.on('error', (error) => console.log('MongoDB connection error:', error));

    // Обработка событий разъединения
    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    // Закрытие соединения с mongo при завершении работы приложения
    process.on('SIGINT', () => {
      db.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

  } catch (error) {
    console.log('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToMongo;