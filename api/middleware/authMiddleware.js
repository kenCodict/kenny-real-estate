import jwt from 'jsonwebtoken';  // For JWT verification (if you're using JWT)
import cookieParser from 'cookie-parser';  // To read cookies from request
import { errorHandler } from '../utils/error.js';

// Your secret key (make sure to store this securely in environment variables)


// Express middleware for authentication
export const authMiddleware = (req, res, next) => {
  // Get the token from the cookies (assuming the cookie is named 'token')
  const token = req.cookies.access_token;

  // If no token is found, send an Unauthorized error
  if (!token) {
    return res.status(401).json(errorHandler(401, 'Unauthorized'));
  }
 
  // Verify the token (decode it)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If there's an error (e.g., token is expired or invalid), send an Unauthorized error
      return res.status(403).json(errorHandler(403, 'Forbidden. Invalid or expired token.'));
    }

    // If token is valid, attach the decoded user data (e.g., user id) to the request object
    req.user = decoded; // assuming the token contains user data like { id, email, username, etc. }

    // Continue to the next middleware or route handler
    next();
  });
};
