import express from "express";
import { addToCart } from "../controllers/cart.js";

const router = express.Router()

router.post("/addToCart", addToCart)

export default router