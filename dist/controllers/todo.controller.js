"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToDo = exports.updateTodo = exports.markAsDone = exports.getBySingleId = exports.getAllTodosHandler = exports.createTodo = exports.welcome = void 0;
const toDoServices = __importStar(require("../services/todo.service"));
const welcome = async (req, res) => {
    try {
        res.status(200).json({ message: "This backend is working" });
        return;
    }
    catch (error) {
        console.log("Error is caused by", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.welcome = welcome;
const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            res.status(400).json({ error: "Task should be provided" });
            return;
        }
        const result = await toDoServices.createTodoService(task);
        res
            .status(201)
            .json({ message: "Task created successfully", data: result });
    }
    catch (error) {
        console.log("Error caused by", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createTodo = createTodo;
const getAllTodosHandler = async (req, res, next) => {
    try {
        const result = await toDoServices.getAllTodosService();
        res.status(200).json({ data: result });
    }
    catch (error) {
        console.log("Error caused by", error.message);
        next(error);
    }
};
exports.getAllTodosHandler = getAllTodosHandler;
const getBySingleId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await toDoServices.getTodoByIdService(id);
        res.status(200).json({ data: result });
    }
    catch (error) {
        console.log("Error caused by", error.errorMessage);
        next(error);
    }
};
exports.getBySingleId = getBySingleId;
const markAsDone = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Id not specified" });
            return;
        }
        const result = await toDoServices.markAsDoneService(id);
        res.status(200).json({ message: "Status changed" });
    }
    catch (error) {
        console.log("Error caused by", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.markAsDone = markAsDone;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        if (!id) {
            res.status(400).json({ error: "Id not specified" });
            return;
        }
        const result = await toDoServices.updateTodoService(id, task);
        res.status(200).json({ data: result });
    }
    catch (error) {
        console.log("Error caused by", error.errorMessage);
        next(error);
    }
};
exports.updateTodo = updateTodo;
const deleteToDo = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Id not specified' });
            return;
        }
        await toDoServices.deleteToDoService(id);
        res.status(200).json({ message: 'ToDo deleted successfully' });
    }
    catch (error) {
        console.log("Error caused by", error.message);
        next(error);
    }
};
exports.deleteToDo = deleteToDo;
//# sourceMappingURL=todo.controller.js.map