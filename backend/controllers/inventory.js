import { db } from "../db.js"

export const getGames = (req, res) => {
    const q = "SELECT c.systemName, v.title, v.year_of_release,  v.genre1,  v.genre2,  v.systemID, v.rating, v.price, v.publisherID, v.sku, v.cover FROM video_game v JOIN console c ON c.systemID = v.systemID JOIN publisher p ON p.publisherID = v.publisherID;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
};

export const getGame = (req, res) => {
    const q = "SELECT `title`, `year_of_release`, `genre1`, `genre2`, `systemID`, `rating`, `price`, `publisherID`, `sku`, `cover` FROM video_game v JOIN console c ON c.systemID===v.systemID JOIN publishers p ON v.publisherID===p.publisherID WHERE sku = ?"
    
    db.query(q, req.body.sku, (err, data) => {
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
};

export const updateGame = (req, res) => {
};