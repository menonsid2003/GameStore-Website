import express from "express";
import { addGame, deleteGame, getGames, updateGame } from "../controllers/inventory.js";

const router = express.Router()

router.get("/", getGames)
router.post("/add", addGame)

router.post("/delete", deleteGame)
router.put("/:sku", updateGame)

export default router