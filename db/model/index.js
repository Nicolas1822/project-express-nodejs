const { User, UserShcema } = require("./user.model.js");

const setupModel = (sequelize) => {
    User.init(UserShcema, User.config(sequelize));
};

module.exports = setupModel;