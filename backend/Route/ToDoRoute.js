import {createToDoList , updateToDoList , getToDoList , deleteToDoList} from "../Controllers/ToDoController.js";
import express from "express";
const router = express.Router();

router.post('/' , createToDoList)
router.get('/' , getToDoList)
router.patch('/:id' , updateToDoList)
router.delete('/:id' , deleteToDoList)

export default router;