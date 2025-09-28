import { NextFunction, Request, Response } from "express";
import ToDo from "../models/todo.model";

import * as toDoServices from "../services/todo.service";

export const welcome = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "This backend is working" });
    return;
  } catch (error) {
    console.log("Error is caused by", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  } catch (error) {
    console.log("Error caused by", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllTodosHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await toDoServices.getAllTodosService();

    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error caused by", (error as Error).message);
    next(error)
  }
};

export const getBySingleId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await toDoServices.getTodoByIdService(id!);

    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error caused by", (error as any).errorMessage);
    next(error)
  }
};

export const markAsDone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Id not specified" });
      return;
    }

    const result = await toDoServices.markAsDoneService(id);

    res.status(200).json({ message: "Status changed" });
  } catch (error) {
    console.log("Error caused by", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!id) {
      res.status(400).json({ error: "Id not specified" });
      return;
    } 

    const result = await toDoServices.updateTodoService(id, task);


    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error caused by", (error as any).errorMessage);
    next(error)
  }
};

export const deleteToDo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {id} = req.params;

    if(!id){
        res.status(400).json({error: 'Id not specified'});
        return;
    }

    await toDoServices.deleteToDoService(id);

    res.status(200).json({message: 'ToDo deleted successfully'});

  } catch (error) {
    console.log("Error caused by", (error as Error).message);
    next(error);
  }
};
