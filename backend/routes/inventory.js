import express from "express";
import { addGame, deleteGame, getGame, getGames, updateGame } from "../controllers/inventory.js";

const router = express.Router()

router.get("/", getGames)
router.get("/:sku", getGame)
router.post("/add", addGame)
router.delete("/:sku", deleteGame)
router.put("/:sku", updateGame)

export default router