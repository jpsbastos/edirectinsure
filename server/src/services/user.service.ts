import * as mongoose from 'mongoose';
import { configuration } from '../../configuration';
import { UserSchema } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const User = mongoose.model('User', UserSchema);
class UserService {

    public async authenticate({ username, password }) {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, (user as any).hash)) {
            const { hash, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, configuration.secret);
            return {
                ...userWithoutHash,
                token
            };
        }
    }
    
    public async getAll() {
        return await User.find().select('-hash');
    }
    
    public async getById(id) {
        return await User.findById(id).select('-hash');
    }
    
    public async create(userParam) {
        // validate
        if (await User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
    
        const user = new User(userParam);
    
        // hash password
        if (userParam.password) {
            (user as any).hash = bcrypt.hashSync(userParam.password, 10);
        }
    
        // save user
        await user.save();
    }
    
    public async update(id, userParam) {
        const user = await User.findById(id);
    
        // validate
        if (!user) throw 'User not found';
        if ((user as any).username !== userParam.username && await User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
    
        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }
    
        // copy userParam properties to user
        Object.assign(user, userParam);
    
        await user.save();
    }
    
    public async delete(id) {
        await User.findByIdAndRemove(id);
    }
}

export const userService = new UserService();