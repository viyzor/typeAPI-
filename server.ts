import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import UserRoutes from './routes/UserRoutes';
import ProductRoutes from './routes/ProductRoutes';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("Error stack:", err.stack);
    res.status(err.status || 500).send({
        success: false,
        message: 'Something broke!',
        error: err.message,
        stack: err.stack // Consider including stack trace only in development mode
    });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
