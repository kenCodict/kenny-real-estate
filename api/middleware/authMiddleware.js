import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        let token;

        // Check for Bearer token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token found, return an error
        if (!token) {
            return res.status(401).json(errorHandler(401, "Unauthorized. No authentication provided."));
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json(errorHandler(403, "Forbidden. Invalid or expired token."));
            }

            // Find user and validate token from DB
            const user = await User.findById(decoded.id);
            if (!user || user.token !== token) {
                return res.status(401).json(errorHandler(401, "Unauthorized. Token mismatch or user not found."));
            }

            // Attach user data to request
            req.user = user;
            next();
        });

    } catch (error) {
        return res.status(401).json(errorHandler(401, "Authentication failed."));
    }
};
