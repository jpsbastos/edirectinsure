import { Observable } from 'rxjs/internal/Observable';
import { apiService } from './api.service';
import { IProject } from './../interfaces/project.interface';
import { ITask } from './../interfaces/task.interface';
import { of } from 'rxjs/internal/observable/of';

const USERS_PATH = 'users';
const PROJECT_PATH = 'projects';
const TASK_PATH = 'tasks';

class ProjectService {

    public getAllUserProjects(): Observable<IProject[]> {
        const userId = apiService.getUserId();
        return userId ? apiService.get<IProject[]>(`${USERS_PATH}/${userId}/${PROJECT_PATH}`): of([]);
    }

    public addProject(project: IProject): Observable<IProject> {
        return apiService.post<IProject>(PROJECT_PATH, project);
    }

    public updateProject(project: IProject): Observable<IProject> {
        return apiService.put<IProject>(`${PROJECT_PATH}/${project._id}`, project);
    }

    public deleteProject(projectId: string): Observable<IProject> {
        return apiService.delete<IProject>(`${PROJECT_PATH}/${projectId}`);
    }

    public addTask(task: ITask): Observable<ITask> {
        return apiService.post<ITask>(TASK_PATH, task);
    }

    public updateTask(task: ITask): Observable<ITask> {
        return apiService.put<ITask>(`${TASK_PATH}/${task._id}`, task);
    }

    public deleteTask(taskId: string): Observable<ITask> {
        return apiService.delete<ITask>(`${TASK_PATH}/${taskId}`);
    }
}

export const projectService = new ProjectService();