import {verifyToken} from "../helpers/jwt.js";
import {createErrorResponse} from "../helpers/responseHandler.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers?.replace('Bearer ', '')
        if (!token) {
            res.status(401).json(createErrorResponse(undefined, "Unauthorized - Missing token"));
            return
        }

        const decoded = verifyToken(token);
        if (typeof decoded === 'string') {
            res.status(401).json(createErrorResponse(undefined, "Unauthorized - Invalid token"));
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
}