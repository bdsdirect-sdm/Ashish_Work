"use strict";
// backend/src/routes/userRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Configure Multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and PDF are allowed.'));
        }
    },
});
// Routes
router.post('/', upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'appointmentLetter', maxCount: 1 },
]), userController_1.addUser);
router.get('/:id', userController_1.getUser);
router.get('/users/getall', userController_1.getAllUser);
router.put('/:id', upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'appointmentLetter', maxCount: 1 },
]), userController_1.updateUser);
exports.default = router;
