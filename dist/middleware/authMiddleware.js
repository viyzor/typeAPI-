"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Cast to 'any' to handle decoded type
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        // Use findOneBy with options for selection
        const user = await userRepository.findOne({
            where: { id: decoded.userId },
            select: ['id', 'username',] // Fields to select
        });
        if (!user) {
            return res.status(401).json({ success: false, message: 'No user found with this token' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized', error });
    }
};
exports.protect = protect;
