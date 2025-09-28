import {Router} from "express";
import { createTodo, deleteToDo, getAllTodosHandler, getBySingleId, markAsDone, updateTodo, welcome } from "../controllers/todo.controller";

const router = Router()

router.get('/', welcome);

router.post('/create', createTodo);

router.get('/all', getAllTodosHandler);

router.get('/single/:id', getBySingleId);

router.patch('/mark/:id', markAsDone)

router.put('/update/:id', updateTodo);

router.delete('/delete/:id', deleteToDo)

export default router;



