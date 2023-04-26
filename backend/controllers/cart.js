import { db } from "../db.js";

export const addToCart = (req, res) => {
    //check if game already exists
    const q = "SELECT * FROM video_game WHERE sku = ?"

    db.query(q, [req.body.video_game.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("SKU does not exist!");

        const c = "SELECT * FROM orderlist WHERE custID = ? AND activeorder = ?"
        const c2 = "SELECT * FROM cart WHERE sku = ? AND orderID= (SELECT o.orderID FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?)"
        const q = "INSERT INTO cart(`orderID`, `sku`,`qty`) SELECT o.orderID, ?, ? FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?"
        const values = [
            req.body.video_game.sku,
            1,
            req.body.custID,
        ]
        const q2 = "UPDATE cart SET `qty` = `qty` + 1 WHERE cart.sku = ? AND cart.orderID = (SELECT o.orderID FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?)"
        const values2 = [
            req.body.video_game.sku,
            req.body.custID,
        ]


        db.query(c, [req.body.custID, true], (err, data) => {
            if (err) return res.json(err)
            if (data.length === 0) {
                const b = "INSERT INTO orderlist(`custID`, `activeorder`) VALUES (?)"
                //console.log("new order made")
                const val2 = [
                    req.body.custID,
                    true,
                ]

                db.query(b, [val2], (err, data) => {
                    //console.log("added to cart after new order made")
                    if (err) return res.json(err)
                    db.query(q, values, (err, data) => {
                        if (err) return res.json(err)
                        return res.status(200).json("Game has been added to cart.")
                    })
                })
            }
            else {
                db.query(c2, [req.body.video_game.sku, req.body.custID], (err, data) => {

                    if (err) return res.json(err)
                    if (data.length === 1) {
                        //console.log("c2 ifyes")
                        db.query(q2, values2, (err, data) => {
                            //console.log(values2)
                            if (err) return res.json(err)
                        })
                    } else {
                        //console.log("c2 ifno")
                        db.query(q, values, (err, data) => {
                            if (err) return res.json(err)
                            return res.status(200).json("Game has been added to cart.")
                        })
                    }
                })
            }
        })
    });
};

export const removeFromCart = (req, res) => {
    const q = "SELECT * FROM video_game WHERE sku = ?"

    db.query(q, [req.body.item.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("SKU does not exist!");

        const c = "SELECT * FROM cart WHERE cart.qty = 1 AND cart.sku = ? AND cart.orderID = (SELECT o.orderID FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?)"
        const valc = [
            req.body.item.sku,
            req.body.item.custID,
        ]

        const q2 = "UPDATE cart SET `qty` = `qty` - 1 WHERE cart.sku = ? AND cart.orderID = (SELECT o.orderID FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?)"
        const values2 = [
            req.body.item.sku,
            req.body.item.custID,
        ]
        const q3 = "DELETE FROM cart WHERE cart.qty = 1 AND cart.sku = ? AND cart.orderID = (SELECT o.orderID FROM orderlist AS o WHERE o.activeorder = true AND o.custID = ?)"
        const val3 = [
            req.body.item.sku,
            req.body.item.custID,
        ]

        db.query(c, valc, (err, data) => {
            if (err) return res.json(err)
            if (data.length === 1) {
                db.query(q3, val3, (err, data) => {
                    //console.log(values2)
                    if (err) return res.json(err)
                })
            }
            else {
                db.query(q2, values2, (err, data) => {
                    //console.log(values2)
                    if (err) return res.json(err)
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
            //console.log(err)
            if (err) return res.json(err)
            db.query(q, values, (err, data) => {
                if (err) return res.json(err)
                return res.status(200).json("Current order has ended.")
            })
        })
    });
};