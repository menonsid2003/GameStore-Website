import express from "express";
import { addToCart, checkout } from "../controllers/cart.js";

const router = express.Router()

router.post("/addToCart", addToCart)
router.post("/checkout", checkout)

export default router