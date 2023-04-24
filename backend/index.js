import express from 'express';
import mysql from "mysql";
import cors from 'cors';
import inventoryRoutes from "./routes/inventory.js"
import consoleRoutes from "./routes/consoles.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json()

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "database_project_final",
});

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend");
})

app.use("/api/auth", authRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/consoles", consoleRoutes);

app.use("/api/user", userRoutes);


app.listen(8800, () => {
    console.log("Connected to backend!")
})