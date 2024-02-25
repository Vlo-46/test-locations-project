import {logger} from "../helpers/winstonLogger.js";

export const ErrorHandler = (
    err,
    req,
    res,
    next
) => {
    logger.error(err.message || err.stack);
    res.status(500).json({error: err.stack});
};