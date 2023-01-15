"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
//fire the router function
exports.taskRouter = (0, express_1.Router)();
//create a default route
exports.taskRouter.get('/tasks', (req, res) => {
    const taskController = new task_controller_1.TaskController();
    taskController.getAll();
    // res.send('express + typescript servexcvr')
});
