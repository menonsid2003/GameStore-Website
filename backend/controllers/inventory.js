import { db } from "../db.js"

export const getGames = (req, res) => {
    var filterOption = req.query.filter;

    if (req.query.filter === undefined) {
        filterOption = 'all';
    }

    const sortOption = req.query.sort;

    let orderClause = "";
    if (sortOption === 'lowhigh') {
        orderClause = "ORDER BY v.price ASC";
    } else if (sortOption === 'highlow') {
        orderClause = "ORDER BY v.price DESC";
    } else {
        orderClause = "";
    }

    var q = "SELECT c.systemName, v.title, v.year_of_release,  v.genre1,  v.genre2,  v.systemID, v.rating, v.price, p.name, v.sku, v.cover FROM video_game v JOIN console c ON c.systemID = v.systemID JOIN publisher p ON p.publisherID = v.publisherID WHERE c.companyName = ?" + orderClause + ";"

    if (filterOption === 'all') {
        q = "SELECT c.systemName, v.title, v.year_of_release,  v.genre1,  v.genre2,  v.systemID, v.rating, v.price, p.name, v.sku, v.cover FROM video_game v JOIN console c ON c.systemID = v.systemID JOIN publisher p ON p.publisherID = v.publisherID " + orderClause + ";"
    }

    db.query(q, [filterOption], (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
};

export const addGame = (req, res) => {
    //check if game already exists
    const q = "SELECT * FROM video_game WHERE sku = ?"

    db.query(q, [req.body.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("SKU already exists!");

        const q = "INSERT INTO video_game(`sku`, `title`, `year_of_release`, `genre1`, `genre2`, `systemID`, `rating`, `price`, `publisherID`, `cover`) VALUES (?)"
        const values = [
            req.body.sku,
            req.body.title,
            req.body.year,
            req.body.genre1,
            req.body.genre2,
            req.body.system,
            req.body.rating,
            req.body.price,
            req.body.publisher,
            req.body.cover,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("Game has been added.")
        })
    });
};

export const deleteGame = (req, res) => {
    const q = "SELECT * FROM video_game WHERE sku = ?"
    
    db.query(q, [req.body.sku], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("SKU does not exist!");

        const q3 = "DELETE FROM video_game WHERE sku = ?"
        const val3 = [
            req.body.sku,
        ]

        db.query(q3, [val3], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("Game has been deleted!");
        })
    })
};

export const updateGame = (req, res) => {
};