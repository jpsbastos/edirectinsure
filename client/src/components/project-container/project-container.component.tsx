import * as React from 'react';
import { IProject } from './../../interfaces/project.interface';
import { ITask } from '../../interfaces/task.interface';

interface IProps {
    project: IProject;
}

export class ProjectContainerComponent extends React.Component<IProps> {
    public render(): JSX.Element {
        const { project } = this.props;
        const { done, todo } = this.getTodoAndDoneLists(project);
        return (
            <div className="project">
                <div className="header">
                    <div className="name">{project.name}</div>
                    <div className="edit"></div>
                    <div className="delete"></div>
                    {this.renderList(todo)}
                    {this.renderList(done, true)}
                </div>
            </div>

        );
    }

    private getTodoAndDoneLists(project: IProject): { done: ITask[]; todo: ITask[] } {
        return project.tasks.reduce((acc, cur) => {
            cur.status === 'done' ? acc.done.push(cur) : acc.todo.push(cur);
            return acc;
        }, { done: [], todo: [] });
    }

    private renderList(list: ITask[], readOnly: boolean = false): JSX.Element {
        const listName = readOnly ? 'Done' : 'To Do';
        const listContent = list.map((task, i) => this.renderTask(task, i, readOnly));
        return (
            <div className="task-list">
                <div className="header">{listName}</div>
                <div className="list">{listContent}</div>
            </div>
        )
    }

    private renderTask(task: ITask, index: number, readOnly: boolean): JSX.Element {
        const iconsToRender = !readOnly ? (
            <div className="task-crud">
                <div className="edit"></div>
                <div className="delete"></div>
            </div>
        ) : null;
        return (
            <div className="task" key={`task-${index}-${task.projectId}`}>
                <input type="checkbox" value={task.description} checked={task.status === 'done'}/>
                <span>{task.description}</span>
                {iconsToRender}
            </div>
        )
    }
}
