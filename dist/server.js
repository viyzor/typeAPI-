"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', UserRoutes_1.default);
app.use('/api/products', ProductRoutes_1.default);
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something broke!', error: err.message });
};
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
