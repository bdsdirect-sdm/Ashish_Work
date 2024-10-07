"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/models/User.ts
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const Address_1 = __importDefault(require("./Address"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    profilePhoto: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    appointmentLetter: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: sequelize_2.default,
    tableName: 'users',
});
// Define association is done in association.ts
Address_1.default.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
    as: 'user',
});
exports.default = User;
