"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDoService = exports.updateTodoService = exports.markAsDoneService = exports.getTodoByIdService = exports.getAllTodosService = exports.createTodoService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const error_util_1 = require("../utils/error.util");
const createTodoService = async (task) => {
    try {
        const newTask = await todo_model_1.default.create({ task });
        if (!newTask) {
            throw (0, error_util_1.createError)(400, "Failed to create new Task");
        }
        await newTask.save();
        return newTask;
    }
    catch (error) {
        throw error;
    }
};
exports.createTodoService = createTodoService;
const getAllTodosService = async () => {
    try {
        const allTodos = await todo_model_1.default.find();
        if (!allTodos || allTodos.length === 0) {
            throw (0, error_util_1.createError)(404, "No Todos found");
        }
        return allTodos;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllTodosService = getAllTodosService;
const getTodoByIdService = async (id) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw (0, error_util_1.createError)(400, 'Invalid id specified');
        }
        const singleTodo = await todo_model_1.default.findById(id);
        if (!singleTodo) {
            throw (0, error_util_1.createError)(404, 'Todo task not found');
        }
        return singleTodo;
    }
    catch (error) {
        throw error;
    }
};
exports.getTodoByIdService = getTodoByIdService;
const markAsDoneService = async (id) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw (0, error_util_1.createError)(400, 'Invalid id specified');
        }
        const toDo = await todo_model_1.default.findById(id);
        if (!toDo) {
            throw (0, error_util_1.createError)(404, 'Todo task not found');
        }
        if (toDo.isCompleted) {
            toDo.isCompleted = false;
        }
        else {
            toDo.isCompleted = true;
        }
        await toDo.save();
    }
    catch (error) {
        throw error;
    }
};
exports.markAsDoneService = markAsDoneService;
const updateTodoService = async (id, task) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw (0, error_util_1.createError)(400, 'Invalid id specified');
        }
        const todo = await todo_model_1.default.findById(id);
        if (!todo) {
            // throw createError(404, 'Task not found')
            throw (0, error_util_1.createError)(404, 'Task not found');
        }
        const updatedTodo = await todo_model_1.default.findByIdAndUpdate(id, { $set: { task, isCompleted: false } }, { new: true, runValidators: true });
        return updatedTodo;
    }
    catch (error) {
        throw error;
    }
};
exports.updateTodoService = updateTodoService;
const deleteToDoService = async (id) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw (0, error_util_1.createError)(400, 'Invalid id specified');
        }
        const toDo = await todo_model_1.default.findById(id);
        if (!toDo) {
            throw (0, error_util_1.createError)(404, 'ToDO not found');
        }
        await todo_model_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
};
exports.deleteToDoService = deleteToDoService;
//# sourceMappingURL=todo.service.js.map