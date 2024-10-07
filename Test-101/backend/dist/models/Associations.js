"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./Address"));
const User_1 = __importDefault(require("./User"));
User_1.default.hasOne(Address_1.default, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'address',
});
Address_1.default.belongsTo(User_1.default, {
    targetKey: 'id',
    foreignKey: 'userId',
    as: 'user',
});
