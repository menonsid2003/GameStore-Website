import express from 'express';
import mysql from "mysql";
import cors from 'cors';
import inventoryRoute from "./routes/inventory.js"
import consoleRoute from "./routes/consoles.js"

const app = express()

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "database_project_final",
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend");
})

app.use("/api/inventory", inventoryRoute);

app.use("/api/consoles", consoleRoute);


app.listen(8800, () => {
    console.log("Connected to backend!")
})