export interface ITask {
    _id?: string;
    description: string;
    projectId: string;
    status: string;
    creation_date?: string;
    finish_date?: string;
}
