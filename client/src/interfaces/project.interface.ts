import { ITask } from './task.interface';

export interface IProject {
    _id?: string;
    userId: string;
    name: string;
    creation_date?: string;
    tasks: ITask[];
}