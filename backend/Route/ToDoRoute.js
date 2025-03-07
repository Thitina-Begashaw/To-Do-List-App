import {createToDoList , updateToDoList , getToDoList , deleteToDoList , toggleToDoStatus} from "../Controllers/ToDoController.js";
import express from "express";
const router = express.Router();

router.post('/' , createToDoList)
router.get('/' , getToDoList)
router.patch('/:id' , updateToDoList)
router.delete('/:id' , deleteToDoList)
router.patch("/:id/status", toggleToDoStatus); // New route for toggling status
export default router;