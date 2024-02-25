import {logger} from "./winstonLogger.js";

export const createSuccessResponse = (data, message) => {
    return {
        success: true,
        message: message || 'Request successful',
        data: data
    };
};

export const createErrorResponse = (error, message) => {
    logger.error((message || 'Request failed') || (error ? error : 'Error'));
    return {
        success: false,
        message: message || 'Request failed',
        error: error ? error : 'Error'
    };
};