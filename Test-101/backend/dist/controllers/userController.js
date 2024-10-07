"use strict";
// backend/src/controllers/userController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getAllUser = exports.getUser = exports.addUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Address_1 = __importDefault(require("../models/Address"));
const sequelize_1 = require("sequelize");
// Add User Controller
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Manual validation
    const errors = [];
    const { firstName, lastName, email, companyAddress, companyCity, companyState, companyZip, homeAddress, homeCity, homeState, homeZip, } = req.body;
    // Validate required fields
    if (!firstName)
        errors.push({ msg: 'First name is required' });
    if (!lastName)
        errors.push({ msg: 'Last name is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
        errors.push({ msg: 'Valid email is required' });
    if (!companyAddress)
        errors.push({ msg: 'Company address is required' });
    if (!companyCity)
        errors.push({ msg: 'Company city is required' });
    if (!companyState)
        errors.push({ msg: 'Company state is required' });
    if (!companyZip || !/^\d{6}$/.test(companyZip))
        errors.push({ msg: 'Company zip must be 6 digits' });
    if (!homeAddress)
        errors.push({ msg: 'Home address is required' });
    if (!homeCity)
        errors.push({ msg: 'Home city is required' });
    if (!homeState)
        errors.push({ msg: 'Home state is required' });
    if (!homeZip || !/^\d{6}$/.test(homeZip))
        errors.push({ msg: 'Home zip must be 6 digits' });
    // Validate file uploads
    if (!req.files || !('profilePhoto' in req.files) || !('appointmentLetter' in req.files)) {
        errors.push({ msg: 'Profile photo and appointment letter are required' });
    }
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    try {
        // Check if email already exists
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
            return; // Ensure return is inside the if block
        }
        const profilePhoto = req.files.profilePhoto[0].filename;
        const appointmentLetter = req.files.appointmentLetter[0].filename;
        // Create User
        const user = yield User_1.default.create({
            firstName,
            lastName,
            email,
            profilePhoto,
            appointmentLetter,
        });
        // Create Address
        yield Address_1.default.create({
            userId: user.id, // user.id is a number
            companyAddress,
            companyCity,
            companyState,
            companyZip,
            homeAddress,
            homeCity,
            homeState,
            homeZip,
        });
        res.status(201).json({ userId: user.id });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
        return;
    }
});
exports.addUser = addUser;
// Get User Controller
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert userId from string to number
    const userId = parseInt(req.params.id, 10);
    console.log("get by id");
    if (isNaN(userId)) {
        res.status(400).json({ msg: 'Invalid user ID' });
        return;
    }
    try {
        const user = yield User_1.default.findByPk(userId, {
            include: [{ model: Address_1.default, as: 'address' }],
        });
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        res.json(user);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
        return;
    }
});
exports.getUser = getUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert userId from string to number
    const users = yield User_1.default.findAll();
    console.log(users);
    res.json(users);
});
exports.getAllUser = getAllUser;
// Update User Controller
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert userId from string to number
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        res.status(400).json({ errors: [{ msg: 'Invalid user ID' }] });
        return;
    }
    // Manual validation
    const errors = [];
    const { firstName, lastName, email, companyAddress, companyCity, companyState, companyZip, homeAddress, homeCity, homeState, homeZip, } = req.body;
    // Validate required fields
    if (!firstName)
        errors.push({ msg: 'First name is required' });
    if (!lastName)
        errors.push({ msg: 'Last name is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
        errors.push({ msg: 'Valid email is required' });
    if (!companyAddress)
        errors.push({ msg: 'Company address is required' });
    if (!companyCity)
        errors.push({ msg: 'Company city is required' });
    if (!companyState)
        errors.push({ msg: 'Company state is required' });
    if (!companyZip || !/^\d{6}$/.test(companyZip))
        errors.push({ msg: 'Company zip must be 6 digits' });
    if (!homeAddress)
        errors.push({ msg: 'Home address is required' });
    if (!homeCity)
        errors.push({ msg: 'Home city is required' });
    if (!homeState)
        errors.push({ msg: 'Home state is required' });
    if (!homeZip || !/^\d{6}$/.test(homeZip))
        errors.push({ msg: 'Home zip must be 6 digits' });
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }
    try {
        const user = yield User_1.default.findByPk(userId, {
            include: [{ model: Address_1.default, as: 'address' }],
        });
        if (!user) {
            res.status(404).json({ errors: [{ msg: 'User not found' }] });
            return;
        }
        // Check if email is being updated to an existing email
        if (email !== user.email) {
            const existingUser = yield User_1.default.findOne({ where: { email, id: { [sequelize_1.Op.ne]: userId } } });
            if (existingUser) {
                res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
                return;
            }
        }
        // Update user fields
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        if (req.files.profilePhoto) {
            user.profilePhoto = req.files.profilePhoto[0].filename;
        }
        if (req.files.appointmentLetter) {
            user.appointmentLetter = req.files.appointmentLetter[0].filename;
        }
        yield user.save();
        // Update Address
        const address = yield Address_1.default.findOne({ where: { userId } });
        if (address) {
            address.companyAddress = companyAddress;
            address.companyCity = companyCity;
            address.companyState = companyState;
            address.companyZip = companyZip;
            address.homeAddress = homeAddress;
            address.homeCity = homeCity;
            address.homeState = homeState;
            address.homeZip = homeZip;
            yield address.save();
        }
        else {
            // If Address doesn't exist, create it
            yield Address_1.default.create({
                userId,
                companyAddress,
                companyCity,
                companyState,
                companyZip,
                homeAddress,
                homeCity,
                homeState,
                homeZip,
            });
        }
        res.json({ msg: 'User updated successfully' });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Server error' }] });
        return;
    }
});
exports.updateUser = updateUser;
