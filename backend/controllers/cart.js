import { db } from "../db.js";

export const addToCart = (req, res) => {
    //check if game already exists
    const q = "SELECT * FROM video_game WHERE sku = ?"

    db.query(q, [req.body.video_game.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("SKU does not exist!");

        const c = "SELECT * FROM orderlist WHERE custID = ? AND activeorder = ?"

        const q = "INSERT INTO cart(`orderID`, `sku`,`qty`) SELECT o.orderID, ?, ? FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?"
        const values = [
            req.body.video_game.sku,
            1,
            req.body.custID,
        ]

        db.query(c, [req.body.custID, true], (err, data) => {
            //console.log(data)
            if (err) return res.json(err)
            if (data.length === 0) {
                const b = "INSERT INTO orderlist(`custID`, `activeorder`) VALUES (?)"
                const val2 = [
                    req.body.custID,
                    true,
                ]

                db.query(b, [val2], (err, data) => {
                    console.log(err)
                    if (err) return res.json(err)
                    db.query(q, values, (err, data) => {
                        if (err) return res.json(err)
                        return res.status(200).json("Game has been added to cart.")
                    })
                })
            }
            else {
                db.query(q, values, (err, data) => {
                    if (err) return res.json(err)
                    return res.status(200).json("Game has been added to cart.")
                })
            }
        })
    });
};

export const checkout = (req, res) => {

    const q = "SELECT * FROM orderlist WHERE custID = ? AND activeorder = true"

    db.query(q, [req.body.custID], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("Customer ID does not have an active order!");

        const q = "UPDATE orderlist SET `activeorder` = ? WHERE custID = ? AND activeorder = ?"
        const values = [
            false,
            req.body.custID,
            true,
        ]

        db.query(q, values, (err, data) => {
            console.log(err)
            if (err) return res.json(err)
            db.query(q, values, (err, data) => {
                if (err) return res.json(err)
                return res.status(200).json("Current order has ended.")
            })
        })
    })
};