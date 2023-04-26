import express from "express";
import { addGame, deleteGame, getGame, getGames, updateGame, sortPriceLH, sortPriceHL, filterNintendo } from "../controllers/inventory.js";

const router = express.Router()

router.get("/", getGames)
router.post("/add", addGame)
router.get("/sortpricelh", sortPriceLH)
router.get("/sortpricehl", sortPriceHL)
router.get("/filternintendo", filterNintendo)

router.get("/:sku", getGame)
router.delete("/:sku", deleteGame)
router.put("/:sku", updateGame)

export default router