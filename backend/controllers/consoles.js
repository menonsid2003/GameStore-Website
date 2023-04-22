import { db } from "../db.js"

export const getConsoles = (req, res) => {
    const q = "SELECT * FROM consoles"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data);
    })
};

export const getConsole = (req, res) => {
};

export const addConsole = (req, res) => {
};

export const deleteConsole = (req, res) => {
};

export const updateConsole = (req, res) => {
};