"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import cors from `cors`;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = __importDefault(require("./sequelize"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads')); // Serve static files
// Routes
// app.use('/api', userRoutes);
app.use('/api/users', userRoutes_1.default);
// Health Check
app.get('/', (req, res) => {
    res.send('Welcome');
});
// Initialize Server and Database
sequelize_1.default.sync({ force: true }).then(() => {
    console.log("database connection succesfully");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
