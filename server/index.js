const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    user: "root",
    host: "local",
    password: "",
    database: "VideoGame",
});

app.post('/create', (req, res) => {
    const name = req.body.vgName
    const year = req.body.vgYear
    const sysID = req.body.vgSysID
    const SKU = req.body.vgSKU

    db.query(
        'INSERT INTO Videogame(Name,Year,sysID,SKU) VALUES (?,?,?,?)',
        [name,year,sysID,SKU],
        (err, result) => {
            if (err){
                console.log(err)
            }
            else{
                res.send("Values inserted.")
            }
        }
        );
});

app.listen(3001, () => {
    console.log("Server is running on 3001");
});