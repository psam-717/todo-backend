import mongoose from "mongoose";
import ToDo, { ITodo } from "../models/todo.model";
import { createError } from "../utils/error.util";
import { todo } from "node:test";

export const createTodoService = async (task: string) => {
  try {
    const newTask = await ToDo.create({ task });

    if (!newTask) {
      throw createError(400, "Failed to create new Task");
    }

    await newTask.save();

    return newTask;
  } catch (error) {
    throw error;
  }
};

export const getAllTodosService = async () => {
  try {
    const allTodos = await ToDo.find();
    if (!allTodos || allTodos.length === 0) {
      throw createError(404, "No Todos found");
    }
    return allTodos;
  } catch (error) {
    throw error;
  }
};

export const getTodoByIdService = async(id: string) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw createError(400, 'Invalid id specified')
        }

        const singleTodo = await ToDo.findById(id);
        if(!singleTodo){
            throw createError(404, 'Todo task not found')
        }

        return singleTodo;
    } catch (error) {
        throw error;
    }
}


export const markAsDoneService = async(id: string) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw createError(400, 'Invalid id specified')
        }

        const toDo = await ToDo.findById(id);
        if(!toDo){
            throw createError(404, 'Todo task not found')
        }

        if(toDo.isCompleted){
            toDo.isCompleted = false
        }else {
            toDo.isCompleted = true
        }

        await toDo.save();
    } catch (error) {
        throw error;
    }
}


export const  updateTodoService = async(id: string, task: string) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw createError(400, 'Invalid id specified')
        }
        
        const todo = await ToDo.findById(id);

        if(!todo) {
            // throw createError(404, 'Task not found')
            throw createError(404, 'Task not found')
        }

        const updatedTodo = await ToDo.findByIdAndUpdate(
            id,
            {$set: {task, isCompleted: false }},
            {new: true, runValidators: true}
        )

        return updatedTodo;

    } catch (error) {
        throw error;
    }
}

export const deleteToDoService = async(id: string) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
        throw createError(400, 'Invalid id specified')
        }

        const toDo = await ToDo.findById(id);

        if(!toDo){
            throw createError(404, 'ToDO not found');
        }

        await ToDo.findByIdAndDelete(id);

    } catch (error) {
        throw error;
    }
}