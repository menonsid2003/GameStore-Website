import express from "express";
import { addToCart, checkout, removeFromCart } from "../controllers/cart.js";

const router = express.Router()

router.post("/addToCart", addToCart)
router.post("/removeFromCart", removeFromCart)
router.post("/checkout", checkout)

export default router