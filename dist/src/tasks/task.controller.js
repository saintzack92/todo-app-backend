"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_entity_1 = require("./task.entity");
const __1 = require("../..");
class TaskController {
    constructor(taskRepository = __1.AppDataSource.getRepository(task_entity_1.Task)) {
        this.taskRepository = taskRepository;
    }
    // @ts-ignore
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            //declare a variable to hold all tasks
            let allTask;
            //fetch all tasks using the repository
            try {
                allTask = yield this.taskRepository.find({
                    order: {
                        date: 'ASC'
                    }
                });
                console.log(allTask);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.TaskController = TaskController;
