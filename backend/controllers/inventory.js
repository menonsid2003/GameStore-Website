import { db } from "../db.js"

export const getGames = (req, res) => {
    //const q = "SELECT * FROM video_game"
    const q = "SELECT c.systemName, v.title, v.year_of_release,  v.genre1,  v.genre2,  v.systemID, v.rating, v.price, v.publisherID, v.sku, v.cover FROM video_game v JOIN consoles c ON c.systemID = v.systemID JOIN publisher p ON p.publisherID = v.publisherID;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
};

export const getGame = (req, res) => {
    const q = "SELECT `title`, `year_of_release`, `genre1`, `genre2`, `systemID`, `rating`, `price`, `publisherID`, `sku`, `cover` FROM video_game v JOIN consoles c ON c.systemID===v.systemID JOIN publishers p ON v.publisherID===p.publisherID"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
};

export const addGame = (req, res) => {
};

export const deleteGame = (req, res) => {
};

export const updateGame = (req, res) => {
};