const Pixel = require('../models/pixel.model');

/**
 * Модуль-сервис для обслуживания модели Pixel.
 * 
 * Предоставляет набор функций для добавления, получения, обновления и удаления пикселей.
 * 
 * @module pixel.service
 */

const PixelService = {

    /**
     * Добавляет новый пиксель в базу данных.
     * 
     * @async
     * @param {object} data - Объект, содержащий данные для создания нового пикселя.
     * @returns {Promise<Pixel>} - Промис, возвращает созданный объект пикселя.
     * @example
     * const newPixel = {
     *   pixel: '2131',
     *   token: '3123123',
     * };
     * const createdPixel = await PixelService.add(newPixel);
     */
    async add(data) {
        const pixel = new Pixel(data);
        await pixel.save();
        return pixel;
    },

    /**
     * Получает пиксель по его номеру.
     * 
     * @async
     * @param {string} pixel - Номер пикселя.
     * @returns {Promise<Pixel|null>} - Промис, возвращающий найденный объект пикселя или `null`, если пиксель не найден.
     * @example
     * const pixel = await PixelService.get('213123');
     */
    async get(pixel) {
        return await Pixel.findOne({ pixel: pixel });
    },

    /**
     * Возвращает все пиксели.
     * 
     * @async
     * @returns {Promise<Pixel|null>} - Промис, возвращает либо все объекты, либо null.
     * @example
     * const pixel = await PixelService.getAll();
     */
        async getAll() {
            return await Pixel.find({});
        },
    

    /**
     * Обновляет существующий пиксель по его номеру.
     * 
     * @async
     * @param {string} pixel - Номер пикселя.
     * @param {object} updateData - Объект, содержащий данные для обновления.
     * @returns {Promise<Pixel|null>} - Промис, возвращающий обновленный объект пикселя или `null`, если пиксель не найден.
     * @example
     * const updatedPixel = await PixelService.update('123123, { token: '233123' });
     */
    async update(pixel, updateData) {
        return await Pixel.findOneAndUpdate({ pixel: pixel }, updateData, { new : true });
    },

    /**
     * Удаляет пиксель по его номеру.
     * 
     * @async
     * @param {string} pixel - Номер пикселя.
     * @returns {Promise<Pixel|null>} - Промис, возвращающий удаленный объект пикселя или `null`, если пиксель не найден.
     * @example
     * await PixelService.delete('123123');
     */
    async delete(pixel) {
        return await Pixel.findOneAndDelete({ pixel: pixel });
    }

}

module.exports = PixelService;