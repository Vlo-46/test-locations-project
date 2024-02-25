import UserService from './UserService.js';
import { comparePasswords } from '../helpers/bcrypt.js';
import { generateToken } from '../helpers/jwt.js';

export default class AuthService {
    static async signIn({ email, password }){
        try {
            const user = await UserService.getUserBy('email', email);

            if (!user || !(await comparePasswords(password, user.password))) {
                return null;
            }

            return generateToken({ userId: user._id, email: user.email });
        } catch (error) {
            throw new Error('Internal server error');
        }
    }
}