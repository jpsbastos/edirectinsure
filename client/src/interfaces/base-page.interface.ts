import { History, Location } from 'history';

export interface IBasePageProps<T> {
    match?: {
        params: T;
        url?: string;
    };
    history?: History;
    location?: Location;
}