const { models } = require("../libs/sequelize.js");

const jwt = require('jsonwebtoken');
const boom = require('boom');
const bcrypt = require('bcrypt');
const { config } = require('../config/config');

class UsersLoginService {

    async usersRegister(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash
        });
        const token = await this.singToken(newUser);
        delete newUser.dataValues.password;
        delete newUser.dataValues.recoveryToken;
        return {
            newUser,
            token
        };
    };

    async userLogin(email, password) {
        const user = await models.User.findOne({ where: { email: email } });
        if (!user) {
            throw boom.notFound('email not found');
        }
        const isMath = await bcrypt.compare(password, user.password);
        if (!isMath) {
            throw boom.unauthorized('the password is incorrect');
        }
        const token = await this.singToken(user);
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return {
            user,
            token
        };
    }

    async singToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret);
        return token;
    }

}

module.exports = UsersLoginService;