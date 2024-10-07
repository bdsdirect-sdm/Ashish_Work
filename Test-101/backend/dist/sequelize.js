"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("./models/Associations");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'Test-101', process.env.DB_USER || 'root', process.env.DB_PASSWORD || 'Password123#@!', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: true,
});
// Optionally, test the connection
sequelize.authenticate()
    .then(() => {
    console.log('Database connected.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
