const { models } = require("../libs/sequelize.js");
const UsersService = require('./users.services.js');
const services = new UsersService();
const { config } = require('../config/config.js')

const boom = require('boom');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class RecoveryService {

    async sendRecoveryPassword(email) {
        const user = await models.User.findOne({ where: { email: email } });
        if (!user) {
            throw boom.unauthorized();
        }
        const token = await this.recoveryToken(user);
        const update = await services.updateUser(user.id, { recoveryToken: token });
        const mail = {
            from: config.email,
            to: `${user.email}`,
            subject: 'recuperacion de contraseña',
            html: `<p>token de recuperacion: ${token} </p>`
        }

        const rta = await this.sendMailRecovery(mail);
        return rta;
    }

    async sendMailRecovery(mail) {
        let transporter = nodemailer.createTransport({
            host: config.smtp,
            secure: true,
            port: 465,
            auth: {
                user: config.email,
                pass: config.passEmail
            }
        });
        transporter.sendMail(mail);
        return { message: 'Mail send' };
    }

    async recoveryToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '20min' });
        return token;
    }

    async updatePassword(id, data) {
        const findUser = await models.User.findByPk(id);
        const hash = await bcrypt.hash(data.password, 10);
        const updateUser = await findUser.update({
            ...data,
            password: hash,
        });
        return { message: 'password update' };
    };
}

module.exports = RecoveryService;