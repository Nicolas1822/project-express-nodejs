const { models } = require("../libs/sequelize.js");

const boom = require('boom');

class UsersService {

    async findUsers() {
        const user = await models.User.findAll();
        return user;
    };

    async findOneUser(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('User not found');
        }
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
    };

    async updateUser(id, data) {
        const findUser = await this.findOneUser(id);
        const updateUser = await findUser.update(data);
        const { name, email } = updateUser;
        return { name, email };
    };

    async deleteUser(id) {
        const deleteUser = await this.findOneUser(id);
        await deleteUser.destroy();
        if (deleteUser) {
            return { message: 'user delete' };
        }
        throw boom.internal('error');
    };
};

module.exports = UsersService;