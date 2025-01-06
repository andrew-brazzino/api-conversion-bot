const User = require('../models/user.model')

const UserService = {
    
    // добавление пользователя
    async add(userData) {
        const user = new User(userData)
        await user.save()
        return user;
    },

    // получение пользователя по telegram id
    async getByIdTg(tgId) {
        return await User.findOne({ tg_id: tgId })
    },

    // получение пользователя по id
    async getById(id) {
        return await User.findOne({ _id: id })
    },

    // получение пользователя по username
    async getByUsername(username) {
        return await User.findOne({ username: username })
    },

    // изменение пользователя
    async update(tgId, updateData) {
        return await User.findOneAndUpdate({ tg_id: tgId }, updateData, { new: true })
    },

    /**
     * Возвращает всех пользователей.
     * 
     * @async
     * @returns {Promise<User|null>} - Промис, возвращает либо все объекты, либо null.
     * @example
     * const users = await userService.getAll();
     */
    async getAll() {
        return await User.find({});
    },

    // удаление пользователя
    async delete(tgId) {
        return await User.findOneAndDelete({ tg_id: tgId })
    },

    // проверка на админа
    async isAdmin(tgId) {
        const user = await User.findOne({ tg_id: tgId })
        return user && user.role == 'admin'
    }

}

module.exports = UserService;