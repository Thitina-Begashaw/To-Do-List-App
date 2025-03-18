import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { createToDoList, updateToDoList, getToDoList, deleteToDoList, toggleToDoStatus,getUserToDoList } from "../Controllers/ToDoController.js";

const router = express.Router();

router.post("/", authMiddleware, createToDoList);
router.get("/", authMiddleware, getToDoList);
router.get("/:id", authMiddleware, getUserToDoList);
router.patch("/:id", authMiddleware, updateToDoList);
router.delete("/:id", authMiddleware, deleteToDoList);
router.patch("/:id/status", authMiddleware, toggleToDoStatus);

export default router;
