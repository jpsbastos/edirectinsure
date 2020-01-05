import { Application, Request, Response } from "express";
import { projectController } from './../controllers/project.controller';

export class Router {       
    public routes(app: Application): void {          
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        });
        
        // Project 
        app.route('/projects') 
        // GET endpoint 
        .get(projectController.getProjects)        
        // POST endpoint
        .post(projectController.addNewProject)

        // Project detail
        app.route('/projects/:id')
        // get specific project
        .get(projectController.getProjectByID)
        .put(projectController.updateProject)
        .delete(projectController.deleteProject)

        // Task 
        app.route('/tasks') 
        .get(projectController.getTasks)
        // POST endpoint
        .post(projectController.addNewTask)

        // Task Details
        app.route('/tasks/:id') 
        // POST endpoint
        .get(projectController.getTaskById)
        // UPDATE endpoint
        .put(projectController.updateTask)
        // DELETE endpoint
        .delete(projectController.deleteTask)
    }
}
