import {hashPassword} from "../helpers/bcrypt.js";
import UserModel from "../models/User.js";

export default class UserService {
    static async createUser(userData) {
        const hashedPassword = await hashPassword(userData.password)
        const newUser = {...userData, password: hashedPassword}
        return await UserModel.create(newUser);
    }

    static async getAllUsers() {
        return UserModel.find();
    }

    static async getUserById(userId) {
        return UserModel.findById(userId);
    }

    static async updateUser(userId, updatedUserData) {
        return UserModel.findByIdAndUpdate(userId, updatedUserData, {new: true});
    }

    static async deleteUser(userId) {
        return UserModel.findByIdAndDelete(userId);
    }

    static async getUserBy(target, value) {
        return UserModel.findOne({[target]: value})
    }
}