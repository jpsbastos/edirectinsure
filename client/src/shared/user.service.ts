import { IUser } from './../interfaces/user.interface';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { apiService } from './api.service';

const PATH = 'users';

class UserService {
    public registerUser(user: IUser): Observable<IUser> {
        return apiService.post<IUser>(`${PATH}/register`, user, false);
    }

    public authenticateUser(user: IUser): Observable<IUser> {
        return apiService.post<IUser>(`${PATH}/authenticate`, user, false).pipe(
            tap(({ token, username, _id }) => {
                apiService.storeUsernameAndToken(token, _id, username);
            }),
        );
    }
}

export const userService = new UserService();