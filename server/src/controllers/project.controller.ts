import * as mongoose from 'mongoose';
import { ProjectSchema } from '../models/project.model';
import { TaskSchema } from './../models/task.model';
import { Request, Response } from 'express';

const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);

class ProjectController {
    public getProjects (req: Request, res: Response) {      
        Project.find()
            .populate('tasks')
            .exec((err, project) => (err) ? res.send(err) : res.json(project));
    }

    public getProjectsByUser (req: Request, res: Response) {      
        Project.find({ userId: req.params.id })
            .populate('tasks')
            .exec((err, project) => (err) ? res.send(err) : res.json(project));
    }

    public addNewProject (req: Request, res: Response) {                
        let newProject = new Project(req.body);
    
        newProject.save((err, project) => {
            if(err){
                res.send(err);
            }    
            res.json(project);
        });
    }

    public getProjectByID (req: Request, res: Response) {
        Project.findById(req.params.id)
            .populate('tasks')
            .exec((err, project) => (err) ? res.send(err) : res.json(project));
    }

    public updateProject (req: Request, res: Response) {           
        Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, project) => {
            if(err){
                res.send(err);
            }
            res.json(project);
        });
    }

    public async deleteProject (req: Request, res: Response) {  
        Project.remove({ _id: req.params.id }, (err) => {
            if(err){
                return res.send(err);
            }

            Task.remove({ projectId: req.params.id }, (err) => {
                if(err){
                    return res.send(err);
                }
            });
            return res.json({ message: 'Successfully deleted project!'});
        });
    }

    public getTasks(req: Request, res: Response) {  
        Task.find({}, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

    public getTaskById(req: Request, res: Response) {  
        Task.findById(req.params.id, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

    public async addNewTask (req: Request, res: Response) {                
        const newTask = new Task(req.body);

        await Project.findById(req.body.projectId, (err, project) => {
            if(err){
                return res.send(err);
            }
            (project as any).tasks.push(newTask);
            project.save((err, _) => {
                if(err){
                    return res.send(err);
                }
            });  
        });
    
        await newTask.save((err, _) => {
            if(err){
                return res.send(err);
            }    
        });

        return res.send(newTask);
    }

    public updateTask (req: Request, res: Response) {                
        Task.findByIdAndUpdate(req.params.id, req.body, { upsert: true, runValidators: true }, (err, task) => {
            return res.send(err ? err : task);
        });
    }

    public deleteTask (req: Request, res: Response) {  
        Task.remove({ _id: req.params.id }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted task!'});
        });
    }
}

export const projectController = new ProjectController();