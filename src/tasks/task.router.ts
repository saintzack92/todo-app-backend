import { Router } from "express";
import { taskController } from "./task.controller";
import { createValidator, updateValidator } from "./task.validator";


//fire the router function
export const taskRouter: Router = Router()

//create a default route
taskRouter.get('/tasks', taskController.getAll)

taskRouter.post('/tasks',
    createValidator,
    taskController.create
)

taskRouter.put('/tasks',
    updateValidator,
    taskController.update
)