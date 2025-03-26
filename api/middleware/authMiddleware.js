import jwt from 'jsonwebtoken';  // For JWT verification
import cookieParser from 'cookie-parser';  // To read cookies from request
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js'; // Import User model

export const authMiddleware = async (req, res, next) => {
    try {
        let token;

        // First, check for the session cookie (access_token)
        if (req.cookies && req.cookies.access_token) {
            token = req.cookies.access_token;
        }
        
        // If no session cookie is found, check for Bearer token in Authorization header
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token is found in both methods, return an Unauthorized error
        if (!token) {
            return res.status(401).json(errorHandler(401, "Unauthorized. No authentication provided."));
        }

        // Verify the token
        jwt.verify(token, 'kennybestinternational@qw231123', async (err, decoded) => {
            if (err) {
                return res.status(403).json(errorHandler(403, "Forbidden. Invalid or expired token."));
            }

            // Find the user in the database and ensure the token matches
            const user = await User.findById(decoded.id);
            if (!user || user.token !== token) {
                return res.status(401).json(errorHandler(401, "Unauthorized. Token mismatch or user not found."));
            }

            // Attach user data to the request object for further use
            req.user = user;

            // Continue to the next middleware or route handler
            next();
        });

    } catch (error) {
        return res.status(401).json(errorHandler(401, "Authentication failed."));
    }
};
