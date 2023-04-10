const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "database_project_final",
});

app.post('/create', (req, res) => {
    const name = req.body.vgName;
    const year = req.body.vgYear;
    const genre = req.body.vgGenre
    const sysID = req.body.vgSysID;
    const rating = req.body.vgRating;
    const price = req.body.vgPrice;
    const publID = req.body.vgPublID;
    const SKU = req.body.vgSKU;


    db.query(
        "INSERT INTO video_game(title,year_of_release,genre,systemID,rating,price,publisherID,sku) VALUES (?,?,?,?,?,?,?,?)",
        [name,year,genre,sysID,rating,price,publID,SKU],
        (err, result) => {
            if (err){
                console.log(err);
            }
            else{
                res.send("Values inserted.");
            }
        }
        );
});

app.listen(3001, () => {
    console.log("Server is running on 3001");
});