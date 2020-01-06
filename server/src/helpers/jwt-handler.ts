import * as expressJwt from 'express-jwt';
import { userService } from '../services/user.service';
import { configuration } from '../../configuration';

export class JwtHelper {

    public static jwt() {
        const secret = configuration.secret;
        return expressJwt({ secret, isRevoked: this.isRevoked }).unless({
            path: [
                // public routes that don't require authentication
                '/users/authenticate',
                '/users/register'
            ]
        });
    }

    private static async isRevoked(req, payload, done) {
        const user = await userService.getById(payload.sub);
    
        // revoke token if user no longer exists
        if (!user) {
            return done(null, true);
        }
    
        done();
    };
}