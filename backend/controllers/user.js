import { db } from "../db.js";

export const employees = (req, res) => {
    //check if user already exists
    //console.log(res);
    const q = "SELECT * FROM user WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("User does not exist!");

        const username = req.body.username;
        const q = "UPDATE user SET `type` = ? WHERE username = ? "
        const values = [
            req.body.type,
        ]

        //console.log(req.body.type)
        db.query(q, [...values, username], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("User has been modified.")
        })
    });
};