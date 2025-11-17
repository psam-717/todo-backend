"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
router.get('/', todo_controller_1.welcome);
router.post('/create', todo_controller_1.createTodo);
router.get('/all', todo_controller_1.getAllTodosHandler);
router.get('/single/:id', todo_controller_1.getBySingleId);
router.patch('/mark/:id', todo_controller_1.markAsDone);
router.put('/update/:id', todo_controller_1.updateTodo);
router.delete('/delete/:id', todo_controller_1.deleteToDo);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map