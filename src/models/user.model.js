const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Схема Mongoose для сущности User.
 *
 * @typedef {object} UserSchema
 * @property {string} tg_id - Уникальный идентификатор из телеграма.
 * @property {string} role - Роль в боте.
 */
const UserSchema = new Schema({
    tg_id : {type: String, required: true},
    role : {type: String, required: true}
})


const User = mongoose.model('User', UserSchema);


module.exports = User;