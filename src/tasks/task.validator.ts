import { body } from "express-validator"
import { ValidationChain } from "express-validator/src/chain"
import { Priority } from "../enums/Priority"
import { Status } from "../enums/Status"

export const createValidator:ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('the task title mandatory')
        .trim()
        .isString()
        .withMessage('title needs to be in text format'),
    body('date')
    .not()
    .isEmpty()
    .withMessage('the task date is mandatory')
    .isString()
    .withMessage('the date needs to be a valid date format'),
    body('description')
    .trim()
    .isString()
    .withMessage('description needs to be in text format'),
    body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('priority can only be normal, high or low'),
    body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('status can only be todo, inprogress or completed ')

]

export const updateValidator = [
    body('id')
      .not()
      .isEmpty()
      .withMessage('The task id is mandatory')
      .trim()
      .isString()
      .withMessage('ID needs to be a valid uuid format'),
    body('status')
      .trim()
      .isIn([
        Status.todo,
        Status.inProgress,
        Status.completed,
      ])
      .withMessage(
        'Status can only be todo,inProgress or completed',
      ),
    
  ];