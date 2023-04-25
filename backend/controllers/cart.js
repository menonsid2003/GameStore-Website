import { db } from "../db.js";

export const addToCart = (req, res) => {
    //check if game already exists
    const q = "SELECT * FROM video_game WHERE sku = ?"

    db.query(q, [req.body.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("SKU does not exist!");

        const c = "SELECT * FROM orderlist WHERE custID = ? AND current = ?"

        const q = "INSERT INTO cart(`orderID`, `sku`,`qty`) SELECT o.orderID, ?, ? FROM orderlist AS o WHERE o.current = true AND o.custID = ?"
        const values = [
            req.body.sku,
            1,
            req.body.custID,
        ]

        db.query(c, [req.body.custID, true], (err, data) => {
            //console.log(data)
            if (err) return res.json(err)
            if (data.length === 0) {
                const b = "INSERT INTO orderlist(`custID`, `current`) VALUES (?)"
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