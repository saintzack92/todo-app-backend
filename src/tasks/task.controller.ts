import { Task } from "./task.entity";
import { AppDataSource } from "../..";
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { UpdateResult } from "typeorm";

class TaskController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        //declare a variable to hold all tasks
        let allTask: Task[]

        //fetch all tasks using the repository

        try {
            allTask = await AppDataSource.getRepository(Task).find({
                order: {
                    createDate: 'DESC',
                },
            })
            allTask = instanceToPlain(allTask) as Task[];
            return res.json(allTask).status(200)
        } catch (error) {
            return res
                .json({ error: 'internal server error' })
                .status(500)

        }
    }
    //convert the task instance to an array of objects

    //method for the post route
    public async create(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        let newTask = new Task()
        newTask.title = req.body.title
        newTask.date = req.body.date
        newTask.description = req.body.description
        newTask.priority = req.body.priority
        newTask.status = req.body.status

        let createdTask: Task
        try {
            createdTask = await AppDataSource.getRepository(
                Task
            ).save(newTask)
            //convert the new task instance from UI to an object
            createdTask = instanceToPlain(createdTask) as Task
            return res.json(createdTask).status(201)
        } catch (err) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }

    }

    public async update(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        let task: Task | null
        //try to find inf the task exists by ID

        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: { id: req.body.id }
            })
        } catch (error) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }
        if (!task) {
            return res.status(404).json({
                error: 'the task with  given id doesn exist'
            })
        }

        //declare a variable for updated task
        let updatedTask: UpdateResult;

        //update the task
        try {
            updatedTask = await AppDataSource
            .getRepository(Task)
            .update(req.body.id, plainToInstance(Task, { status: req.body.status, }))
            updatedTask = instanceToPlain(updatedTask) as UpdateResult

            return res.json(updatedTask).status(200)
        } catch (error) {
            return res
                .json({ error: 'internal server error' })
                .status(500)
        }
    }
}



export const taskController = new TaskController