const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Схема Mongoose для сущности Pixel.
 *
 * @typedef {object} PixelSchema
 * @property {string} pixel - Уникальный идентификатор пикселя.
 * @property {string} token - Уникальный токен, связанный с пикселем.
 */
const pixelSchema = new Schema({
    pixel : {type: String, required: true, unique: true},
    token : {type: String, required: true, unique: true}
})


const Pixel = mongoose.model('Pixel', pixelSchema);


module.exports = Pixel;