import mysql from "mysql";

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "database_project_final",
});