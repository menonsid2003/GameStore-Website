import express from "express";
import { getConsoles, getConsole, deleteConsole, updateConsole } from "../controllers/consoles.js";

const router = express.Router()

router.get("/", getConsoles)
router.get("/:systemID", getConsole)
router.post("/",)
router.delete("/:systemID", deleteConsole)
router.put("/:systemID", updateConsole)


export default router