import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(new ApiError(401, 'Authentication token is missing'));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ApiError(401, 'User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid authentication token'));
    }
};