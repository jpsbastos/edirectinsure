import { userService } from "../services/user.service";

// https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management
class UserController {
    public authenticate(req, res, next) {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }
    
    public register(req, res, next) {
        userService.create(req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
    
    public getAll(req, res, next) {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }
    
    public getCurrent(req, res, next) {
        userService.getById(req.user.sub)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
    
    public getById(req, res, next) {
        userService.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
    
    public update(req, res, next) {
        userService.update(req.params.id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
    
    public _delete(req, res, next) {
        userService.delete(req.params.id)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
}

export const userController = new UserController();