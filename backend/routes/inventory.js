import express from "express";
import { deleteGame, getGame, getGames, updateGame } from "../controllers/inventory.js";

const router = express.Router()

router.get("/", getGames)
router.get("/:sku", getGame)
router.post("/",)
router.delete("/:sku", deleteGame)
router.put("/:sku", updateGame)


export default router