import express from "express";
import { addToCart, removeFromCart } from "../controllers/cart.js";

const router = express.Router()

router.post("/addToCart", addToCart)
router.post("/removeFromCart", removeFromCart)

export default router