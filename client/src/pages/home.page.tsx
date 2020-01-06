import * as React from 'react';
import { IBasePageProps } from '../interfaces/base-page.interface';
import { BasePage } from './base.page';
import { IProject } from './../interfaces/project.interface';
import { projectService } from './../shared/project.service';
import { ProjectContainerComponent } from '../components/project-container/project-container.component';

interface IState {
    projects: IProject[];
}

export class HomePage extends BasePage<{}> {
    public state: IState = {
        projects: [],
    };

    private projectInput: React.Ref<HTMLInputElement>;

    public constructor(props: IBasePageProps<{}>) {
        super(props);
        this.projectInput = React.createRef();
    }

    public componentDidMount(): void {
        this.subscription = projectService.getAllUserProjects()
            .subscribe((projects) => this.setState({ projects }));
    }

    /**
     */
    public render(): JSX.Element {
        return (
            <div className="page home-page">
                {this.renderProjects()}
                {this.renderNewProjectContainer()}
            </div>
        );
    }

    private renderProjects(): JSX.Element[] {
        return this.state.projects.map((project, i) => <ProjectContainerComponent key={`project-${i}`} project={project}/>);
    }

    private renderNewProjectContainer(): JSX.Element {
        return (
            <div className="new-project-container">
                <div className="header">Create a New Project</div>
                <div className="project-box">
                    <input type="text" name="new-project" placeholder="Project Name" ref={this.projectInput}/>
                </div>
                <div className="project-submit">
                    <button onClick={() => console.log('CRIAR')}>Create Project</button>
                </div>
            </div>
        )
    }
}
