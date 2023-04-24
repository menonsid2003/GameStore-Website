import express from "express";
import { employees } from "../controllers/user.js";

const router = express.Router()

router.post("/employees", employees)

export default router