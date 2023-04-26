import express from "express";
import { register, login, logout, addToCustomer } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/addToCustomer", addToCustomer)

export default router