import {comparePasswords} from '../helpers/bcrypt.js';
import {generateToken} from '../helpers/jwt.js';
import {createErrorResponse, createSuccessResponse} from "../helpers/responseHandler.js";
import UserService from "../services/UserService.js";

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await UserService.getUserBy('email', email);

        if (!user || !(await comparePasswords(password, user.password))) {
            res.status(401).json(createErrorResponse(undefined, "Invalid email or password"));
            return;
        }

        const token = generateToken({userId: user._id, email: user.email});
        res.json(createSuccessResponse({token}));
    } catch (error) {
        next(error)
    }
}

export const signUp = async (req, res, next) => {
    const data = req.body;

    try {
        const candidate = await UserService.getUserBy('email', data.email);

        if (candidate) {
            res.status(409).json(createErrorResponse(undefined, 'User is exist'));
            return;
        }

        const user = await UserService.createUser(data)
        res.status(201).json(createSuccessResponse({user}));
    } catch (error) {
        next(error)
    }
}
