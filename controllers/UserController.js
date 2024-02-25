import UserService from "../services/UserService.js";
import {createErrorResponse, createSuccessResponse} from "../helpers/responseHandler.js";

export const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await UserService.createUser(userData);

        res.status(201).json(createSuccessResponse({user}));
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();

        res.status(200).json(createSuccessResponse({users}));
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            res.status(404).json(createErrorResponse(undefined, "User not found"));
            return;
        }

        res.status(200).json(createSuccessResponse({user}));
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await UserService.updateUser(userId, updatedUser);
        if (!user) {
            res.status(404).json(createErrorResponse(undefined, "User not found"));
            return;
        }
        res.status(200).json(createSuccessResponse({user}));
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await UserService.deleteUser(userId);
        if (!user) {
            res.status(404).json(createErrorResponse(undefined, "User not found"));
            return;
        }
        res.status(200).json(createSuccessResponse({user}));
    } catch (error) {
        next(error)
    }
}