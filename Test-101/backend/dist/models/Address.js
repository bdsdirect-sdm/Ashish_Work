"use strict";
// backend/src/models/Address.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../sequelize"));
const User_1 = __importDefault(require("./User"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true // Remove if multiple addresses per user are needed
    },
    companyAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyCity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    companyState: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    companyZip: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
        validate: {
            len: [6, 6],
            isNumeric: true
        }
    },
    homeAddress: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    homeCity: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    homeState: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    homeZip: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
        validate: {
            len: [6, 6],
            isNumeric: true
        }
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'addresses',
});
// Define association is done in association.ts
User_1.default.hasOne(Address, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'address',
});
exports.default = Address;
