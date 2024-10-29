import express from "express";
import { getTodo, sendTodo, getTodosNextWeek, updateTodo, getAll } from "../controller/postTodo.js";

const router = express.Router();

router.post("/getTodo", getTodo);
router.post("/sendTodo", sendTodo);
router.post("/sendNext", getTodosNextWeek);
router.post("/update", updateTodo);
router.post("/getAll", getAll);
export default router;
