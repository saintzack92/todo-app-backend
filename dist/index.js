"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const task_entity_1 = require("./src/tasks/task.entity");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const task_router_1 = require("./src/tasks/task.router");
// Instantiate express app
exports.app = (0, express_1.default)();
dotenv_1.default.config();
//parse request body
exports.app.use(body_parser_1.default.json());
//use cors install types as well
exports.app.use((0, cors_1.default)());
// Create Database Connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [task_entity_1.Task],
    synchronize: true,
});
// Define sever port
const port = process.env.PORT;
// Create a default route.
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
exports.AppDataSource.initialize()
    .then(() => {
    // Start listenting to the requests on the defined port
    exports.app.listen(port);
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
exports.app.use('/', task_router_1.taskRouter);
