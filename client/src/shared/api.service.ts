import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

const BASE_PATH="http://localhost:3000";
export const STORAGE_CONFIG={
    TOKEN_KEY: 'Token',
    USER_KEY: 'UserId',
    USER_NAME_KEY: 'UserName'
};

class ApiService {

    /**
     * Retrieves data from a specified url by performing an AJAX Request with HTTP Get Method
     * @param path url
     */
    public get<T>(path: string, auth: boolean = true): Observable<T> {
        return ajax.getJSON(`${BASE_PATH}/${path}`, auth && this.getAuthorizationHeader());
    }

    /**
     * Retrieves data from a specified url by performing an AJAX Request with HTTP POST Method
     * @param path url
     * @param body body object
     */
    public post<T>(path: string, body: T, auth: boolean = true): Observable<T> {
        return ajax.post(`${BASE_PATH}/${path}`, body, auth && this.getAuthorizationHeader()).pipe(
            map((raw) => raw.response),
        );
    }

    /**
     * Retrieves data from a specified url by performing an AJAX Request with HTTP PUT Method
     * @param path url
     * @param body body object
     */
    public put<T>(path: string, body: T, auth: boolean = true): Observable<T> {
        return ajax.put(`${BASE_PATH}/${path}`, body, auth && this.getAuthorizationHeader()).pipe(
            map((raw) => raw.response),
        );
    }

    /**
     * Retrieves data from a specified url by performing an AJAX Request with HTTP DELETE Method
     * @param path url
     */
    public delete<T>(path: string, auth: boolean = true): Observable<T> {
        return ajax.delete(`${BASE_PATH}/${path}`, auth && this.getAuthorizationHeader()).pipe(
            map((raw) => raw.response),
        );
    }

    public storeUsernameAndToken(token: string, userId: string, userName: string): void {
        localStorage.setItem(STORAGE_CONFIG.TOKEN_KEY, token);
        localStorage.setItem(STORAGE_CONFIG.USER_KEY, userId);
        localStorage.setItem(STORAGE_CONFIG.USER_NAME_KEY, userName);
    }

    public getAuthorizationHeader(): { Authorization: string } {
        const token = localStorage.getItem(STORAGE_CONFIG.TOKEN_KEY);
        return token ? { Authorization: `Bearer ${token}`} : null;
    }

    public getUserId(): string {
        return localStorage.getItem(STORAGE_CONFIG.USER_KEY);
    }

    public getUserName(): string {
        return localStorage.getItem(STORAGE_CONFIG.USER_NAME_KEY);
    }
}

export const apiService = new ApiService();